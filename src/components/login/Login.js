import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import { useNavigate } from "react-router-dom";

const Login = ({ handleLoginOpen, handleToggleClose }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const submit = async ({ email, password }) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      handleLoginOpen();
      toast("Inicio de sesión exitoso", { type: "success" });
      reset();
    } catch (error) {
      toast("El usuario o contraseña no son correctos", { type: "error" });
    } finally {
      setIsLoading(false);
      navigate("/projects");
    }
  };

  const closeSesion = () => {
    signOut(auth)
      .then(() => {
        toast("Sesión cerrada con éxito", { type: "success" });
        navigate("/");
        handleToggleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="relative isolate overflow-hidden py-24 sm:py-32">
      <>
        <form
          className="mx-auto flex flex-col w-[70%] items-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit(submit)}
        >
          <h3 className="text-2xl font-bold text-center">Login</h3>

          <section
            className={`form_user ${
              watch("email") ? "on" : ""
            } flex flex-col w-full`}
          >
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email:
            </label>
            <input
              type="email"
              autoComplete="off"
              className={`input_user ${
                errors.email ? "on" : ""
              } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
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

          <section
            className={`form_password ${
              watch("password") ? "on" : ""
            } flex flex-col w-full`}
          >
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password:
            </label>
            <div className="flex items-center w-full">
              <input
                type={showPassword ? "text" : "password"}
                autoComplete="off"
                className={`input_password ${
                  errors.password ? "on" : ""
                } shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
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
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}

          <div className="text-center">
            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 mt-4 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
            )}
          </div>
        </form>
        <div className="mx-auto flex flex-col w-[70%] items-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <i onClick={closeSesion} className="bx bx-log-out"></i>
        </div>
      </>
    </div>
  );
};

export default Login;
