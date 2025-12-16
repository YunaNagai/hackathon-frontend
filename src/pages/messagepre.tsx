import { useState } from "react";
import { useParams } from "react-router-dom";

export default function MessagesPre() {
  const { id } = useParams(); // /products/:id/messages-pre の id

  // 仮のメッセージ一覧（API をつなぐまではこれで OK）
  const [messages, setMessages] = useState([
    { id: 1, userName: "ユーザーA", message: "まだ在庫ありますか？" },
    { id: 2, userName: "出品者", message: "はい、あります！" },
  ]);

  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    // 仮でメッセージを追加（API 連携前の動作）
    setMessages([
      ...messages,
      { id: messages.length + 1, userName: "あなた", message: input },
    ]);

    setInput("");
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      <h1>購入前DM</h1>
      <p>商品ID: {id}</p>

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