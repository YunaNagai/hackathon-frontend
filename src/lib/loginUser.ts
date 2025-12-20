// src/lib/loginUser.ts
import { signInWithEmailAndPassword } from "firebase/auth";
import { fireAuth } from "../firebase";

export async function loginUser(email: string, password: string) {
  return await signInWithEmailAndPassword(fireAuth, email, password);
}