import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebaseConfig";
import CreateProjectForm from "../../forms/CreateProjectForm";

const CreateProject = () => {
  const [newProject, setNewProject] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert("Debes estar autenticado para crear un proyecto.");
        return;
      }

      const newProject = {
        company: data.company,
        createdAt: Timestamp.fromDate(new Date(data.createdAt)),
        description: data.description,
        identification: data.identification,
        userName: user.displayName,
        post_inform: {
          media: {
            media: {
              images: [],
              floor_plan: "",
              status: "pending",
            },
          },
        },
        pre_inform: {
          media: {
            media: {
              images: [],
              freehand_floor_plan: "",
              status: "pending",
            },
          },
        },
      };

      const docRef = await addDoc(collection(db, "projects"), newProject);
      console.log("Proyecto creado con ID:", docRef.id);
      alert("Proyecto creado exitosamente");
    } catch (error) {
      console.error("Error al crear el proyecto:", error);
      alert("Hubo un error al crear el proyecto.");
    }
  };

  const setProject = () => setNewProject(!newProject);

  return (
    <div className="relative isolate overflow-hidden py-24 sm:py-32 flex items-center justify-center">
      {newProject ? (
        <CreateProjectForm
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
          register={register}
          errors={errors}
          setProject={setProject}
        />
      ) : (
        <button
          type="button"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={setProject}
        >
          Crear Proyecto
        </button>
      )}
    </div>
  );
};

export default CreateProject;
