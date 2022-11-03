import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const AdminRoute = () => {
  const auth = useContext(AuthContext);
  const { isAdmin } = auth;
  return isAdmin() ? <Outlet /> : <Navigate to='/login' />;
};

export default AdminRoute;
