import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const config = useSelector((state) => state.config.config);
  if (config) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;
