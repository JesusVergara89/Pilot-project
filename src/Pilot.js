import { useEffect, useState } from "react";
import { auth, db } from "./firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./components/protected/ProtectedRoutes";
import Projects from "./components/projects/Projects";
import Header from "./components/header/Header";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Welcome from "./components/welcome/Welcome";

function Pilot() {
  const [user, setUser] = useState(auth.currentUser); 
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

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

  console.log(tasks, user);

  return (
    <div className="min-h-screen relative flex flex-col">
      {user && <Welcome />}
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/projects" element={<Projects />} />
        </Route>
      </Routes>
    </div>
  );
}

export default Pilot;
