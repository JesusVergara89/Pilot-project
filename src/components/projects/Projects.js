import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebaseConfig";
import Project from "./project/Project";
import CreateProject from "./create/CreateProject";

const Projects = () => {
  const [projt, setProjt] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const projtArray = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setProjt(projtArray);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchData();
  }, []);

  console.log(projt);

  return (
    <>
      <CreateProject />
      <section className="flex mt-10 flex-wrap gap-4 p-4 items-center justify-center">
        {projt.map((item, index) => (
          <Project key={index} item={item} />
        ))}
      </section>
    </>
  );
};

export default Projects;
