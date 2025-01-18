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

    const unsubscribe = onSnapshot(postRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        const images = data.post_inform?.media?.images || [];
        const limitedImages = images.slice(-20);

        const limitedData = {
          ...data,
          post_inform: {
            ...data.post_inform,
            media: {
              ...data.post_inform.media,
              images: limitedImages, 
            },
          },
        };

        setProject({ ...limitedData, id: snapshot.id });
      }
    });

    return () => unsubscribe(); 
  }, [id]);

  return (
    <section className="flex mt-24 flex-col gap-4 p-4 items-center justify-center">
      <PrePosInform info={project} />
    </section>
  );
};

export default ProjectInfo;
