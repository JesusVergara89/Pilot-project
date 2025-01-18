import { useEffect, useState } from "react";
import { auth } from "./firebase/firebaseConfig";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./components/protected/ProtectedRoutes";
import Projects from "./components/projects/Projects";
import Header from "./components/header/Header";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Welcome from "./components/welcome/Welcome";
import ProjectInfo from "./components/projects/project/ProjectInfo";
import LandingPage from "./components/projects/projectLadingPages/LandingPage";
import Grounds from "./components/grounds/Grounds";
import GroundInfo from "./components/grounds/ground/GroundInfo";
import EditProject from "./components/edit/EditProject";

function Pilot() {
  const [user, setUser] = useState(auth.currentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen relative flex flex-col">
      {user && <Welcome />}
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/" element={<Header />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/landing" element={<LandingPage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/landaudit" element={<Grounds />} />
          <Route path="/projectinfo/:id" element={<ProjectInfo />} />
          <Route path="/groundinfo/:id" element={<GroundInfo />} />
          <Route path="/edit/:id" element={<EditProject />} />
        </Route>
      </Routes>
    </div>
  );
}

export default Pilot;
