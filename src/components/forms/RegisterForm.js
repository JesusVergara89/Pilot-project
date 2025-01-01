import React from "react";
import Loader from "../loader/Loader";

const RegisterForm = ({
  handleSubmit,
  submit,
  register,
  errors,
  showPassword,
  togglePasswordVisibility,
  isLoading,
}) => {
  return (
    <div className="relative isolate overflow-hidden py-24 sm:py-32">
      <form
        className="mx-auto flex flex-col w-[70%] items-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit(submit)}
      >
        <h3 className="text-2xl font-bold text-center">Register</h3>

        <section className="flex flex-col w-full">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Name:
          </label>
          <input
            autoComplete="off"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            {...register("name", { required: "Por favor, ingrese el nombre." })}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </section>

        <section className="flex flex-col w-full">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
          </label>
          <input
            autoComplete="off"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            {...register("email", {
              required: "Por favor, ingrese el email.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Por favor, ingrese un correo electrónico válido.",
              },
            })}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </section>

        <section className="flex flex-col w-full">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password:
          </label>
          <div className="flex items-center w-full">
            <input
              autoComplete="off"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: "Por favor, ingrese una contraseña.",
              })}
            />
            <div
              onClick={togglePasswordVisibility}
              className="ml-2 text-gray-700 text-3xl cursor-pointer"
            >
              {showPassword ? (
                <i className="bx bx-hide"></i>
              ) : (
                <i className="bx bx-show"></i>
              )}
            </div>
          </div>
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </section>

        <div className="text-center flex justify-center gap-4 mt-4">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Register
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
