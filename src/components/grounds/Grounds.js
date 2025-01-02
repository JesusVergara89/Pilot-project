import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../../firebase/firebaseConfig';
import CreateGround from './create/CreateGround';
import Ground from './card/Ground';

const Grounds = () => {
    const [ground, setGround] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, "grounds"));
            const projtArray = querySnapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            setGround(projtArray);
          } catch (error) {
            console.error("Error fetching documents:", error);
          }
        };
    
        fetchData();
      }, []);

      console.log(ground);
  return (
    <>
      <CreateGround />
      <section className="flex flex-wrap gap-4 items-center mb-10 justify-center">
        {ground.map((item, index) => (
          <Ground key={index} item={item} />
        ))}
      </section>
    </>
  );
}

export default Grounds