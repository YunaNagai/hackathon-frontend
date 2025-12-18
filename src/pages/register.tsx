import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const handleRegister = async () => {
    try{
      const res = await fetch(
        "https://hackathon-backend-1002011225238.us-central1.run.app/user",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            password,
            age: Number(age),
          }),
        }            
      );
      if (!res.ok){
        alert("登録に失敗しました");
        return;
      }
      const data = await res.json();
      console.log("登録成功",data);
    
    navigate("/login");
    }catch(err){
      console.error(err);
      alert("エラーが発生しました");
    }
  };
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

        <input
          type="number"
          placeholder="年齢"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <button onClick={handleRegister}>登録</button>
      </div>

      <p style={{ marginTop: 20 }}>
        <a href="/login">ログインはこちら</a>
      </p>
    </div>
  );
}