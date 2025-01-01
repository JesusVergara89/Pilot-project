import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebaseConfig";
import CreateProjectForm from "../../forms/CreateProjectForm";
import { toast } from "react-toastify";

const CreateProject = () => {
  const [newProject, setNewProject] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {
    register,
    handleSubmit,
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

      const newProject = {
        company: data.company,
        createdAt: Timestamp.fromDate(new Date(data.createdAt)),
        description: data.description,
        identification: data.identification,
        userName: user.displayName,
        places: data.places,
        post_inform: {
          media: {
            images: [],
            status: "pending",
          },
        },
        pre_inform: {
          media: {
            images: [],
            status: "pending",
          },
        },
      };

      const docRef = await addDoc(collection(db, "projects"), newProject);
      console.log("Proyecto creado con ID:", docRef.id);
      toast("Proyecto creado exitosamente.", { type: "success" });
    } catch (error) {
      console.error("Error al crear el proyecto:", error);
      toast("Hubo un error al crear el proyecto.", { type: "error" });
    }
  };

  const setProject = () => setNewProject(!newProject);

  return (
    <div className="relative mt-32 isolate overflow-hidden py-8 sm:py-8 flex items-center justify-center">
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
          Crear proyecto
        </button>
      )}
    </div>
  );
};

export default CreateProject;
