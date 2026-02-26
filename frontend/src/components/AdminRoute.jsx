import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function AdminRoute({ children }) {
  const { role } = useContext(AuthContext);

  if (role !== "admin") {
    return <Navigate to="/login" />;
  }

  return children;
}

export default AdminRoute;