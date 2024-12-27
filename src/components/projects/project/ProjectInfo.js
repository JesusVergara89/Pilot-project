import React from "react";
import { useParams } from "react-router-dom";

const ProjectInfo = () => {
  const { id } = useParams();

  return <p>Seleccionaste el usuario con el id {id}</p>;
};

export default ProjectInfo;
