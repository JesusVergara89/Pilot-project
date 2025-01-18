import { collection, query, getDocs, limit } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Project from "./project/Project";
import CreateProject from "./create/CreateProject";
import { db } from "../../firebase/firebaseConfig";

const Projects = () => {
  const [projt, setProjt] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(collection(db, "projects"), limit(20));
        const querySnapshot = await getDocs(q);

        const projtArray = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setProjt(projtArray);
      } catch (err) {
        console.error("Error fetching documents:", err);
        setError("Error al obtener los proyectos.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Cargando proyectos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <CreateProject />
      <section className="flex flex-wrap gap-4 items-center justify-center">
        {projt.length > 0 ? (
          projt.map((item, index) => <Project key={index} item={item} />)
        ) : (
          <p>No hay proyectos disponibles.</p>
        )}
      </section>
    </>
  );
};

export default Projects;
