import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
export default function Dashboard() {
  const user = useContext(AuthContext);

  if (user.isAdmin()) {
    return <AdminDashboard />;
  }

  return <UserDashboard />;
}
