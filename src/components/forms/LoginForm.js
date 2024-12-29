import React from "react";
import Loader from "../loader/Loader";

const LoginForm = ({
  handleSubmit,
  submit,
  register,
  errors,
  showPassword,
  togglePasswordVisibility,
  isLoading,
}) => {
  return (
    <form
      className="mx-auto flex flex-col w-[70%] items-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit(submit)}
    >
      <h3 className="text-2xl font-bold text-center">Login</h3>

      <section className="flex flex-col w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Email:
        </label>
        <input
          type="email"
          autoComplete="off"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register("email", {
            required: "Por favor, ingrese el email.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Por favor, ingrese un correo electrónico válido.",
            },
          })}
        />
      </section>
      {errors.email && <p className="error">{errors.email.message}</p>}

      <section className="flex flex-col w-full">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Password:
        </label>
        <div className="flex items-center w-full">
          <input
            type={showPassword ? "text" : "password"}
            autoComplete="off"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
      </section>
      {errors.password && <p className="error">{errors.password.message}</p>}

      <div className="text-center flex justify-center gap-4 mt-4">
        {isLoading ? (
          <Loader />
        ) : (
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Login
          </button>
        )}
      </div>
    </form>
  );
};

export default LoginForm;
