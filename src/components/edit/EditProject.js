import { doc, onSnapshot, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../../firebase/firebaseConfig";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const EditProject = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const docRef = doc(db, "projects", id);

    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      const data = snapshot.data();
      if (data) {
        reset(data); 
        setPlaces(data.places || []); 
      }
    });

    return () => unsubscribe();
  }, [id, reset]);

  const handlePlaceChange = (index, value) => {
    const updatedPlaces = [...places];
    updatedPlaces[index] = value;
    setPlaces(updatedPlaces);
  };

  const addPlace = () => {
    setPlaces([...places, ""]); 
  };

  const removePlace = async (index) => {
    const placeToRemove = places[index];
    try {
      await updateDoc(doc(db, "projects", id), {
        places: arrayRemove(placeToRemove),
      });
      setPlaces(places.filter((_, i) => i !== index));
      toast("Lugar eliminado exitosamente.", { type: "success" });
    } catch (error) {
      console.error("Error al eliminar el lugar:", error);
      toast("Error al eliminar el lugar.", { type: "error" });
    }
  };

  const submit = async (data) => {
    try {
      const docRef = doc(db, "projects", id);
      await updateDoc(docRef, {
        ...data,
      });
      for (const place of places) {
        if (place) {
          await updateDoc(docRef, {
            places: arrayUnion(place),
          });
        }
      }

      toast("Proyecto actualizado exitosamente.", { type: "success" });
      navigate("/projects"); 
    } catch (error) {
      console.error("Error al actualizar el proyecto:", error);
      toast("Error al actualizar el proyecto.", { type: "error" });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="mx-auto mt-32 flex flex-col w-[70%] items-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h3 className="text-2xl font-bold text-center">Editar Proyecto</h3>

      <section className="flex flex-col w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Compañía:
        </label>
        <input
          type="text"
          {...register("company", {
            required: "El campo compañía es obligatorio",
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.company && (
          <p className="text-red-500">{errors.company.message}</p>
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
          Orden de trabajo:
        </label>
        <input
          type="text"
          {...register("identification", {
            required: "El campo identificación es obligatorio",
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.identification && (
          <p className="text-red-500">{errors.identification.message}</p>
        )}
      </section>

      <section className="flex flex-col w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Lugares:
        </label>
        {places.map((place, index) => (
          <div key={index} className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={place}
              onChange={(e) => handlePlaceChange(index, e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <button
              type="button"
              onClick={() => removePlace(index)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Eliminar
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addPlace}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
        >
          Agregar Lugar
        </button>
      </section>

      <div className="text-center flex justify-center gap-4 mt-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Guardar Cambios
        </button>
        <button
          type="button"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={() => navigate("/projects")}
        >
          Volver
        </button>
      </div>
    </form>
  );
};

export default EditProject;
