import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
      <h1>新規登録</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <input
          type="text"
          placeholder="名前"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button>登録</button>
      </div>

      <p style={{ marginTop: 20 }}>
        <a href="/login">ログインはこちら</a>
      </p>
    </div>
  );
}