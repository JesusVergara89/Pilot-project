import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Timestamp, updateDoc, doc, arrayUnion } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { auth, db, storage } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";

const CreatePreInform = ({ id }) => {
  const [progress, setProgress] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const user = auth.currentUser;

  const submit = async (data) => {
    try {
      const storageRef = ref(
        storage,
        `/images/${Date.now()}${data.image[0].name}`
      );
      const uploadImage = uploadBytesResumable(storageRef, data.image[0]);

      uploadImage.on(
        "state_changed",
        (snapshot) => {
          const progressPercent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progressPercent);
        },
        (error) => {
          console.error("Error al subir la imagen:", error);
        },
        async () => {
          const imageUrl = await getDownloadURL(uploadImage.snapshot.ref);

          const newImageObject = {
            comments: data.comments,
            description: data.description,
            image: imageUrl,
            location: data.location,
            data_loader: user.displayName,
            element_name: data.element_name,
            createdAt: Timestamp.now().toDate(),
          };

          const docRef = doc(db, "projects", id);
          await updateDoc(docRef, {
            "pre_inform.media.images": arrayUnion(newImageObject),
          });
          toast("Proyecto actualizado exitosamente.", { type: "success" });
          setProgress(0);
        }
      );
    } catch (error) {
      toast("Error al actualizar el proyecto", { type: "error" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="mx-auto flex flex-col w-[70%] items-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 gap-4"
    >
      <h3 className="text-2xl font-bold text-center">Crear registro</h3>

      <section className="flex flex-col w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Comentarios:
        </label>
        <input
          type="text"
          {...register("comments", {
            required: "El campo comentarios es obligatorio",
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.comments && (
          <p className="text-red-500">{errors.comments.message}</p>
        )}
      </section>

      <section className="flex flex-col w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Descripción:
        </label>
        <input
          type="text"
          {...register("description", {
            required: "El campo descripción es obligatorio",
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.description && (
          <p className="text-red-500">{errors.description.message}</p>
        )}
      </section>

      <section className="flex flex-col w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Ubicación:
        </label>
        <input
          type="text"
          {...register("location", {
            required: "El campo ubicación es obligatorio",
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
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
          {...register("element_name", {
            required: "El campo nombre del elemento es obligatorio",
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.element_name && (
          <p className="text-red-500">{errors.element_name.message}</p>
        )}
      </section>

      <section className="flex flex-col w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Imagen:
        </label>
        <input
          type="file"
          {...register("image", { required: "El campo imagen es obligatorio" })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.image && <p className="text-red-500">{errors.image.message}</p>}
      </section>

      {progress > 0 && (
        <p className="text-blue-500">Progreso de subida: {progress}%</p>
      )}

      <div className="text-center flex justify-center gap-4 mt-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Crear Proyecto
        </button>
      </div>
    </form>
  );
};

export default CreatePreInform;
