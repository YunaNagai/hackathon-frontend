// src/lib/fetchUserRole.ts
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function fetchUserRole(uid: string) {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return null;

  const data = snap.data();
  return data.role ?? null;
}