import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Timestamp, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { auth, db, storage } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";

const CreatePostInform = ({ id, info }) => {
  const [photos, setPhotos] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);
  const [progress, setProgress] = useState(0);

  const resetForm = {
    comments: "",
    description: "",
    location: "",
    element_name: "",
    createdAt: "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const user = auth.currentUser;

  const handlePhotoChange = (e, index) => {
    const newPhotos = [...photos];
    newPhotos[index] = e.target.files[0];
    setPhotos(newPhotos);
  };

  const submit = async (data) => {
    try {
      if (!photos[0]) {
        toast("La primera imagen es obligatoria.", { type: "error" });
        return;
      }

      const imageUrls = await Promise.all(
        photos.map(async (photo) => {
          if (photo) {
            const photoRef = `/${info.company}/${info.identification}/${
              data.location
            }/${Date.now()}${photo.name}`;
            const storageRef = ref(storage, photoRef);
            const uploadTask = uploadBytesResumable(storageRef, photo);

            return new Promise((resolve, reject) => {
              uploadTask.on(
                "state_changed",
                (snapshot) => {
                  const progressPercent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                  );
                  setProgress(progressPercent);
                },
                (error) => reject(error),
                async () =>
                  resolve(await getDownloadURL(uploadTask.snapshot.ref))
              );
            });
          }
          return null;
        })
      );

      const imageObjects = imageUrls
        .filter((url) => url !== null)
        .map((url) => ({
          comments: data.comments,
          description: data.description,
          image: url,
          location: data.location,
          data_loader: user.displayName,
          element_name: data.element_name,
          createdAt: Timestamp.now().toDate(),
        }));

      const docRef = doc(db, "projects", id);
      await updateDoc(docRef, {
        "post_inform.media.images": arrayUnion(...imageObjects),
      });

      toast("Proyecto actualizado exitosamente.", { type: "success" });
      setProgress(0);
      setPhotos([null, null, null, null, null, null, null, null]);
      reset(resetForm);
    } catch (error) {
      toast("Error al actualizar el proyecto", { type: "error" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="mx-auto flex flex-col w-[310px] sm:w-[370px] items-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 gap-4"
    >
      <h3 className="text-2xl font-bold text-center">
        Registrar información de mantenimientos
      </h3>

      <section className="flex flex-col w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Comentarios:
        </label>
        <input
          type="text"
          {...register("comments")}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </section>

      <section className="flex flex-col w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Descripción:
        </label>
        <input
          type="text"
          {...register("description")}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </section>

      <section className="flex flex-col w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Ubicación:
        </label>
        <select
          {...register("location", {
            required: "El campo ubicación es obligatorio",
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="" disabled>
            Seleccione una ubicación
          </option>
          {info.places.map((place, index) => (
            <option key={index} value={place}>
              {place}
            </option>
          ))}
          <option value="no_contemplado">No contemplado</option>
        </select>
        {errors.location && (
          <p className="text-red-500">{errors.location.message}</p>
        )}
      </section>

      <section className="flex flex-col w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Nombre del elemento:
        </label>
        <input
          type="text"
          {...register("element_name")}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </section>

      <section className="flex flex-wrap gap-4">
        {photos.map((_, index) => (
          <div key={index} className="flex flex-col w-full">
            <label className={`block text-gray-700 text-sm font-bold mb-2`}>
              {index === 0
                ? "Imagen 1 (Obligatoria):"
                : `Imagen ${index + 1} (Opcional):`}
            </label>
            <input
              type="file"
              onChange={(e) => handlePhotoChange(e, index)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
        ))}
      </section>

      {progress > 0 && (
        <p className="text-blue-500">Progreso de subida: {progress}%</p>
      )}

      <div className="text-center flex justify-center gap-4 mt-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add information
        </button>
      </div>
    </form>
  );
};

export default CreatePostInform;
