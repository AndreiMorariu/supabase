import { useAuth } from "../context/Auth";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutes() {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="login" />;
}

export default ProtectedRoutes;
