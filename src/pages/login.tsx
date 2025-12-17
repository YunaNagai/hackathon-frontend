import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { isYieldExpression } from "typescript";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login} = useAuth();
  const handleLogin = () => {
    login({
      id: 1,
      name: "yn",
      role: "buyer",
    });
    navigate("/products");
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
        <button onClick={handleLogin}>ログイン</button>
      </div>

      <p style={{ marginTop: 20 }}>
        <a href="/register">新規登録はこちら</a>
      </p>
    </div>
  );
}