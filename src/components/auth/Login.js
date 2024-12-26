import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeConfig, openConfig } from "../../store/slices/configSlice";

const Login = () => {
  const dispatch = useDispatch();
  const config = useSelector((state) => state.config.config);
  const user = auth.currentUser;

  const uuid = process.env.REACT_APP_ALLOWED_REGISTRATION_ID;

  const handleToggleOpen = () => {
    dispatch(openConfig());
  };

  const handleToggleClose = () => {
    dispatch(closeConfig());
  };

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const submit = async ({ email, password }) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      handleToggleOpen();
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

  const toRegistration = () => navigate("/register");

  return (
    <div className="relative isolate overflow-hidden py-24 sm:py-32">
      <>
        {config === false ? (
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
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}

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
        ) : (
          <>
            <div className="mx-auto flex w-[70%] justify-center items-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4  gap-4">
              <h4 className="text-xl font-bold text-gray-700">Cerrar sesión</h4>
              <i
                onClick={closeSesion}
                className="bx bx-log-out text-4xl font-bold hover:text-blue-500 hover:cursor-pointer"
              ></i>
            </div>
            {user?.uid === uuid ? (
              <div className="flex justify-center w-[70%] mx-auto">
                <button
                  onClick={toRegistration}
                  type="button"
                  className="bg-green-900 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Registration
                </button>
              </div>
            ) : (
              " "
            )}
          </>
        )}
      </>
    </div>
  );
};

export default Login;
