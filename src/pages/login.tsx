import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { fireAuth } from "../firebase";
import { setSourceMapRange } from "typescript";

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = async () => {
    try{
      const userCredential = await signInWithEmailAndPassword(
        fireAuth,
        email,
        password
      );

      login({
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        name: userCredential.user.displayName,
      });

      alert("ログイン成功: "+ userCredential.user.email);
      setEmail("");
      setPassword("");
      navigate("/products");
    }catch(err){
      if(err instanceof Error){
        alert(err.message);
      }else{
        alert("ログインに失敗しました")
      }
    }
  };
  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
      <h1>ログイン</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          type="email"
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signIn}>ログイン</button>
      </div>

      <p style={{ marginTop: 20 }}>
        <a href="/register">新規登録はこちら</a>
      </p>
    </div>
  );
}