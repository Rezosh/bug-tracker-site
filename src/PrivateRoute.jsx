import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const PrivateRoute = () => {
  const auth = useContext(AuthContext);
  const { isAuthenticated } = auth;
  return isAuthenticated() ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
