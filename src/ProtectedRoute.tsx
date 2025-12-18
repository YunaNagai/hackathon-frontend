import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { ReactElement } from "react";


export const ProtectedRoute = ({ children }: { children: ReactElement }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};