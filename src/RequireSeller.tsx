import { Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { ReactNode } from "react";

export default function RequireSeller({ children }: { children: ReactNode }) {
  const { user } = useAuth();

  // 未ログイン → ログインへ
  if (!user) return <Navigate to="/login" replace />;

  // seller 以外 → トップへ
  if (user.role !== "seller") return <Navigate to="/" replace />;

  return <>{children}</>;
}