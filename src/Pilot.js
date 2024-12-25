import { useEffect, useState } from "react";
import { db } from "./firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function Pilot() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "projects"));
        const tasksArray = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTasks(tasksArray);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchData();
  }, []);

  console.log(tasks);

  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<Header />} />
      </Routes>
      <Footer/> 
    </div>
  );
}

export default Pilot;
