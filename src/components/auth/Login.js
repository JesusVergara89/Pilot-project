import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeConfig, openConfig } from "../../store/slices/configSlice";
import LoginForm from "../forms/LoginForm";

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
      navigate("/landing");
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
    <div className="relative isolate mt-10 overflow-hidden py-24 sm:py-32">
      <>
        {config === false ? (
          <LoginForm
            handleSubmit={handleSubmit}
            submit={submit}
            register={register}
            errors={errors}
            showPassword={showPassword}
            togglePasswordVisibility={togglePasswordVisibility}
            isLoading={isLoading}
          />
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
              <div className="flex flex-col gap-4 justify-center w-[70%] mx-auto">
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
