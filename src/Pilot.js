import { useEffect, useState } from "react";
import { db } from "./firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ProtectedRoutes from "./components/protected/ProtectedRoutes";
import Projects from "./components/projects/Projects";
import Login from "./components/login/Login";
import { useSelector, useDispatch } from "react-redux";
import { toggleConfig } from "./store/slices/configSlice";


function Pilot() {
  const dispatch = useDispatch();
  const config = useSelector((state) => state.config.config); 

  const handleToggle = () => {
    dispatch(toggleConfig()); 
  };
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
  console.log(config);

  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/login" element={<Login handleLogin={handleToggle} login={config} />} />
        <Route element={<ProtectedRoutes login={config} />}>
          <Route path="/projects" element={<Projects />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default Pilot;
