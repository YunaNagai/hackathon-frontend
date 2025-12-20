// src/pages/Register.tsx
import { useState } from "react";
import { registerUser } from "../lib/registerUser";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      await registerUser(email, password, role);
      alert("登録が完了しました");
    } catch (err) {
      console.error(err);
      alert("登録に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <h2>ユーザー登録</h2>

      <label>メールアドレス</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <label>パスワード</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <label>ロール（役割）</label>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as "buyer" | "seller")}
        style={{ width: "100%", marginBottom: "20px" }}
      >
        <option value="buyer">購入者</option>
        <option value="seller">出品者</option>
      </select>

      <button
        onClick={handleRegister}
        disabled={loading}
        style={{
          width: "100%",
          padding: "10px",
          background: "#333",
          color: "#fff",
          borderRadius: "4px",
        }}
      >
        {loading ? "登録中..." : "登録"}
      </button>
    </div>
  );
}