import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { BACKEND_URL } from "../constants"; // あなたの構成に合わせて
import { useAuth } from "../contexts/AuthContext";


export default function MessagesPre() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;
  const { user } = useAuth();

  // Hooks は必ずトップレベルで呼ぶ
  const [messages, setMessages] = useState([
    { id: 1, userName: "ユーザーA", message: "まだ在庫ありますか？" },
    { id: 2, userName: "出品者", message: "はい、あります！" },
  ]);
  const [input, setInput] = useState("");

  // product がない場合の UI は return ではなく JSX 内で条件分岐
  if (!product) {
    return (
      <div style={{ padding: 20 }}>
        <p>商品情報がありません（state が渡っていません）</p>
      </div>
    );
  }

  const goTransaction = async () => {
      console.log("DEBUG buyerId:", user?.uid);
  console.log("DEBUG sellerId:", product.sellerId);
  console.log("DEBUG product:", product);

    const res = await fetch(`${BACKEND_URL}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: crypto.randomUUID(),
        productId: id,
        buyerId: user?.uid,
        sellerId: product.sellerId,
        status: "requested",
        createdAt: new Date().toISOString(),
      }),
    });

    const newTx = await res.json();

    const detailRes = await fetch(`${BACKEND_URL}/transactions/${newTx.id}`);
    const fullTx = await detailRes.json();

    navigate(`/transactions/${fullTx.id}`);
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
      {/* ここから先は今まで通り */}
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
        <button onClick={() => {
          if (!input.trim()) return;
          setMessages([...messages, { id: messages.length + 1, userName: "あなた", message: input }]);
          setInput("");
        }}>
          送信
        </button>
      </div>

      <button
        onClick={goTransaction}
        style={{
          marginTop: 20,
          padding: "10px 20px",
          backgroundColor: "#4caf50",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        購入する
      </button>
    </div>
  );
}