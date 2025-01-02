import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { auth, db } from "../../../firebase/firebaseConfig";
import { toast } from "react-toastify";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import CreateGroundForm from "../../forms/CreateGroundForm";


const CreateGround = () => {
    const [newGround, setNewGround] = useState(false);

    const resetForm = {
      brand: "",
      client: "",
      createdAt: "",
      equipment: "",
      model: "",
      ot: "",
      plant: "",
      serie: "",
    };
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();
  
    const onSubmit = async (data) => {
      try {
        const user = auth.currentUser;
        if (!user) {
          toast("Debes estar autenticado para crear un proyecto.", {
            type: "warning",
          });
          return;
        }
        const newGround = {
          brand: data.brand,
          client: data.client,
          createdAt: Timestamp.fromDate(new Date(data.createdAt)),
          equipment: data.equipment,
          model: data.model,
          ot: data.ot,
          plant: data.plant,
          serie: data.serie,
          userName: user.displayName,
          data: [],
        };
        const docRef = await addDoc(collection(db, "grounds"), newGround);
        console.log("Proyecto creado con ID:", docRef.id);
        toast("Proyecto creado exitosamente.", { type: "success" });
        reset(resetForm);
      } catch (error) {
        console.error("Error al crear el proyecto:", error);
        toast("Hubo un error al crear el proyecto.", { type: "error" });
      }
    };
  
    const setGround = () => setNewGround(!newGround);
  return (
    <div className="relative mt-32 isolate overflow-hidden py-8 sm:py-8 flex items-center justify-center">
      {newGround ? (
        <CreateGroundForm
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          errors={errors}
          setGround={setGround}
        />
      ) : (
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={setGround}
        >
          Crear proyecto
        </button>
      )}
    </div>
  );
}

export default CreateGround