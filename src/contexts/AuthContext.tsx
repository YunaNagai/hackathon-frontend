// src/contexts/AuthContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { fireAuth } from "../firebase";
import { fetchUserRole } from "../lib/fetchUserRole";

type User = {
  uid: string;
  email: string | null;
  name?: string | null;
  role?: "buyer" | "seller";
};

type AuthContextType = {
  user: User | null;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(fireAuth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        return;
      }

      const role = await fetchUserRole(firebaseUser.uid);

      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName,
        role,
      });
    });

    return () => unsub();
  }, []);

  const logout = () => {
    signOut(fireAuth);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthProvider で囲ってください");
  return ctx;
}
