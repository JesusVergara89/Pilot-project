import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase/firebaseConfig";
import PrePosInform from "./PrePosInform";

const ProjectInfo = () => {
  const { id } = useParams();

  const [project, setProject] = useState("");

  useEffect(() => {
    const postRef = doc(db, "projects", id);
    onSnapshot(postRef, (snapshot) => {
      setProject({ ...snapshot.data(), id: snapshot.id });
    });
  }, [id]);

  //console.log(project, "this is the project");

  return (
    <section className="flex mt-24 flex-col gap-4 p-4 items-center justify-center">
      <PrePosInform info={project} />
    </section>
  );
};

export default ProjectInfo;
