import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase/firebaseConfig";
import CardGround from "../card/CardGround";
import CreateGroundInform from "../../forms/CreateGroundInform";

const GroundInfo = () => {
  const { id } = useParams();

  const [ground, setGround] = useState("");

  useEffect(() => {
    const postRef = doc(db, "grounds", id);
    onSnapshot(postRef, (snapshot) => {
      setGround({ ...snapshot.data(), id: snapshot.id });
    });
  }, [id]);

  console.log(ground);

  return (
    <section className="flex mt-24 flex-col gap-4 p-4 items-center justify-center">
      <CreateGroundInform id={id} />
      <CardGround info={ground} />
    </section>
  );
};

export default GroundInfo;
