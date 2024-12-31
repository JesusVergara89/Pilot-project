import React, { useState } from "react";

const CreateProjectForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  setProject,
}) => {
  const [places, setPlaces] = useState([""]);

  const handlePlaceChange = (index, value) => {
    const updatedPlaces = [...places];
    updatedPlaces[index] = value;
    setPlaces(updatedPlaces);
  };

  const addPlace = () => {
    setPlaces([...places, ""]);
  };

  const removePlace = (index) => {
    const updatedPlaces = places.filter((_, i) => i !== index);
    setPlaces(updatedPlaces);
  };

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit({ ...data, places }))}
      className="mx-auto flex flex-col w-[70%] items-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h3 className="text-2xl font-bold text-center">Crear Proyecto</h3>

      {/* * *  */}
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

      {/* * *  */}
      <section className="flex flex-col w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Fecha de creación:
        </label>
        <input
          type="datetime-local"
          {...register("createdAt", {
            required: "El campo fecha de creación es obligatorio",
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.createdAt && (
          <p className="text-red-500">{errors.createdAt.message}</p>
        )}
      </section>

      {/* * *  */}
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

      {/* * *  */}
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

      {/* * *  */}
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

      {/* * *  */}
      <div className="text-center flex justify-center gap-4 mt-4">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Crear
        </button>
        <button
          type="button"
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={setProject}
        >
          Volver
        </button>
      </div>
    </form>
  );
};

export default CreateProjectForm;
