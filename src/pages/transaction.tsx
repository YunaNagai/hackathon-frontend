import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Transaction() {
  const { user } = useAuth();
  const { id } = useParams(); // /transactions/:id の id
  // 仮の取引ステータス
  const [status, setStatus] = useState("購入手続き中");
  const advanceStatus = () => {
    if (status == "購入手続き中") setStatus("発送待ち");
  };
  // 仮のメッセージ一覧
  const [messages, setMessages] = useState([
    { id: 1, userName: "購入者", message: "購入しました！よろしくお願いします。" },
    { id: 2, userName: "出品者", message: "ありがとうございます！準備します。" },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      { id: messages.length + 1, userName: "あなた", message: input },
    ]);

    setInput("");
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 20 }}>
      <h1>取引ページ</h1>
      <p>取引ID: {id}</p>

      {/* 取引ステータス */}
      <div
        style={{
          padding: 12,
          backgroundColor: "#f5f5f5",
          borderRadius: 8,
          marginBottom: 20,
        }}
      >
        <strong>現在のステータス:</strong> {status}
      </div>

      {user?.role=="buyer"&&status=="購入手続き中"&&(
        <button
          onClick={advanceStatus}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2196f3",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
          >
            発送を待つ
          </button>
      )}
      {user?.role=="seller"&&status=="発送待ち"&&(
        <button
          onClick={() => setStatus("発送済み")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ff9800",
            color: "white",
            border: "none",
            cursor: "pointer",
            marginBottom: 20,
          }}
          >
            発送しました
          </button>
      )}
      {user?.role=="buyer"&&status === "発送済み" && (
  <button
    onClick={() => setStatus("取引完了")}
    style={{
      padding: "10px 20px",
      backgroundColor: "#4caf50",
      color: "white",
      border: "none",
      cursor: "pointer",
      marginBottom: 20,
    }}
  >
    取引を完了する
  </button>
)}
      {status=="取引完了"&&(
        <p style={{ marginTop: 20, fontWeight: "bold", color: "green"}}>
          取引が完了しました！
        </p>
      )}

      {/* メッセージ一覧 */}
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: 8,
          padding: 12,
          height: 300,
          overflowY: "auto",
          marginBottom: 20,
        }}
      >
        {messages.map((m) => (
          <div key={m.id} style={{ marginBottom: 12 }}>
            <strong>{m.userName}</strong>
            <p style={{ margin: "4px 0" }}>{m.message}</p>
          </div>
        ))}
      </div>

      {/* 入力欄 */}
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          placeholder="メッセージを入力"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={handleSend}>送信</button>
      </div>
    </div>
  );
}