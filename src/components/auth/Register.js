import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../../firebase/firebaseConfig";
import RegisterForm from "../forms/RegisterForm";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submit = async ({ email, password, name }) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, { displayName: name });
      toast("Usuario registrado con éxito", { type: "success" });
      navigate("/login");
    } catch (error) {
      toast(`Error: ${error.message}`, { type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RegisterForm
    handleSubmit={handleSubmit}
    submit={submit}
    register={register}
    errors={errors}
    showPassword={showPassword}
    togglePasswordVisibility={togglePasswordVisibility}
    isLoading={isLoading}
    />
  );
};

export default Register;
