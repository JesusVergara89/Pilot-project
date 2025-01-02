import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { auth, db, storage } from "../../firebase/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { arrayUnion, doc, updateDoc, setDoc, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";

const CreateGroundInform = ({ id }) => {
  const [progress, setProgress] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const user = auth.currentUser;

  const submit = async (data) => {
    try {
      if (!data.image || !data.image[0]) {
        toast("Debe seleccionar una imagen.", { type: "error" });
        return;
      }

      const storageRef = ref(storage, `/images/${Date.now()}_${data.image[0].name}`);
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
          toast("Error al subir la imagen.", { type: "error" });
        },
        async () => {
          const imageUrl = await getDownloadURL(uploadImage.snapshot.ref);

          const newObject = {
            application: data.application || "",
            cal: data.cal || "",
            continuity: data.continuity || "",
            current: data.current || "",
            e_v: data.e_v || "",
            f_d: data.f_d || "",
            image: imageUrl || "",
            location: data.location || "",
            observation: data.observation || "",
            point: data.point || "",
            r: data.r || "",
            resistance: data.resistance || "",
            tip_type_or_point_function: data.tip_type_or_point_function || "",
            data_loader: user?.displayName || "Usuario desconocido",
            createdAt: Timestamp.now().toDate(),
          };

          const docRef = doc(db, "grounds", id);
          try {
            await updateDoc(docRef, {
              data: arrayUnion(newObject),
            });
          } catch (error) {
            if (error.code === "not-found") {
              await setDoc(docRef, { data: [newObject] });
            } else {
              throw error;
            }
          }

          toast("Proyecto actualizado exitosamente.", { type: "success" });
          setProgress(0);
          reset();
        }
      );
    } catch (error) {
      console.error(error);
      toast("Error al actualizar el proyecto.", { type: "error" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="mx-auto mt-14 flex flex-col w-[310px] sm:w-[370px] items-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 gap-4"
    >
      <h3 className="text-2xl font-bold text-center">
        Registrar auditoría de tierras
      </h3>

      {[
        { name: "point", label: "Punto" },
        { name: "location", label: "Ubicación" },
        { name: "application", label: "Aplicación" },
        { name: "continuity", label: "Continuidad" },
        { name: "resistance", label: "Resistencia" },
        { name: "current", label: "Corriente a masa" },
        { name: "tip_type_or_point_function", label: "Tipo de punta / función de punto" },
        { name: "e_v", label: "Características del punto [ E/V ]" },
        { name: "cal", label: "Características del punto [ CAL ]" },
        { name: "f_d", label: "Características del punto [ F/D ]" },
        { name: "r", label: "Características del punto [ R ]" },
        { name: "observation", label: "Observación" },
      ].map(({ name, label }) => (
        <section key={name} className="flex flex-col w-full">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {label}:
          </label>
          <input
            type="text"
            {...register(name, { required: `El campo ${label} es obligatorio.` })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors[name] && (
            <p className="text-red-500">{errors[name].message}</p>
          )}
        </section>
      ))}

      <section className="flex flex-col w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Imagen:
        </label>
        <input
          type="file"
          {...register("image", { required: "El campo imagen es obligatorio." })}
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
          Agregar información
        </button>
      </div>
    </form>
  );
};

export default CreateGroundInform;
