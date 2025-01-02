import React from "react";

const CreateGroundForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  setGround,
}) => {
  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data))}
      className="mx-auto flex flex-col w-[70%] items-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <h3 className="text-2xl font-bold text-center">Crear Proyecto</h3>

      {/* * *  */}
      <section className="flex flex-col w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Cliente:
        </label>
        <input
          type="text"
          {...register("client", {
            required: "El campo cliente es obligatorio",
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.client && (
          <p className="text-red-500">{errors.client.message}</p>
        )}
      </section>

      {/* * *  */}
      <section className="flex flex-col w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          OT:
        </label>
        <input
          type="text"
          {...register("ot", {
            required: "El campo ot es obligatorio",
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.ot && <p className="text-red-500">{errors.ot.message}</p>}
      </section>

      {/* * *  */}
      <section className="flex flex-col w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Planta:
        </label>
        <input
          type="text"
          {...register("plant", {
            required: "El campo planta es obligatorio",
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.plant && <p className="text-red-500">{errors.plant.message}</p>}
      </section>

      {/* * *  */}
      <section className="flex flex-col w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Equipo:
        </label>
        <input
          type="text"
          {...register("equipment", {
            required: "El campo marca es obligatorio",
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.equipment && <p className="text-red-500">{errors.equipment.message}</p>}
      </section>

      {/* * *  */}
      <section className="flex flex-col w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Marca:
        </label>
        <input
          type="text"
          {...register("brand", {
            required: "El campo marca es obligatorio",
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.brand && <p className="text-red-500">{errors.brand.message}</p>}
      </section>

      {/* * *  */}
      <section className="flex flex-col w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Modelo:
        </label>
        <input
          type="text"
          {...register("model", {
            required: "El campo modelo es obligatorio",
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.model && <p className="text-red-500">{errors.model.message}</p>}
      </section>

      {/* * *  */}
      <section className="flex flex-col w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Serie:
        </label>
        <input
          type="text"
          {...register("serie", {
            required: "El campo serie es obligatorio",
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.serie && <p className="text-red-500">{errors.serie.message}</p>}
      </section>

      {/* * *  */}
      <section className="flex flex-col w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Fecha:
        </label>
        <input
          type="datetime-local"
          {...register("createdAt", {
            required: "El campo fecha es obligatorio",
          })}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        {errors.createdAt && (
          <p className="text-red-500">{errors.createdAt.message}</p>
        )}
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
          onClick={setGround}
        >
          Volver
        </button>
      </div>
    </form>
  );
};

export default CreateGroundForm;
