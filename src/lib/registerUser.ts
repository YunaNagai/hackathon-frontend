// src/lib/registerUser.ts
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { fireAuth, db } from "../firebase"; // fireAuth を使っているなら fireAuth に変更

export async function registerUser(
  email: string,
  password: string,
  role: "buyer" | "seller"
) {
  // Firebase Auth にユーザー作成
  const userCredential = await createUserWithEmailAndPassword(fireAuth, email, password);
  const user = userCredential.user;

  // Firestore に role を保存
  await setDoc(doc(db, "users", user.uid), {
    role,
    email: user.email,
    name: user.displayName ?? null,
  });

  return user;
}