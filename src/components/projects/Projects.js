import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Project from "./project/Project";
import CreateProject from "./create/CreateProject";
import { db } from "../../firebase/firebaseConfig";
import { Link } from "react-router-dom";

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
      <Link
        to="/"
        className="bg-blue-500 mt-20 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline block text-center mx-auto my-4"
      >
        Home
      </Link>
      <CreateProject />
      <section className="flex flex-wrap gap-4 p-4 items-center justify-center">
        {projt.map((item, index) => (
          <Project key={index} item={item} />
        ))}
      </section>
    </>
  );
};

export default Projects;
