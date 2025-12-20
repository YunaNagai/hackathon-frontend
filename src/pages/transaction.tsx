import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useMessages } from "../contexts/MessagesContext";
import { BACKEND_URL } from "../constants";

export default function Transaction() {
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();

  // Hooks は全部トップ
  const { messages, sendMessage } = useMessages();
  const [input, setInput] = useState("");

  const [transaction, setTransaction] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 取引データ取得
  useEffect(() => {
    if (!id) return;

    fetch(`${BACKEND_URL}/transactions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTransaction(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // 🔥 ここに advanceStatus を置く（Hooks の後、return の前）
  const advanceStatus = async () => {
    console.log("DEBUG PUT URL:", `${BACKEND_URL}/transactions/${transaction.id}`);
console.log("DEBUG transaction.id:", transaction.id);
console.log("DEBUG BACKEND_URL:", BACKEND_URL);

    if (!transaction) return;

    let nextStatus = null;

    if (transaction.status === "requested" && user?.role === "buyer") {
      nextStatus = "shipping";
    }
    if (transaction.status === "shipping" && user?.role === "seller") {
      nextStatus = "shipped";
    }
    if (transaction.status === "shipped" && user?.role === "buyer") {
      nextStatus = "completed";
    }

    if (!nextStatus) return;

        console.log("DEBUG PUT URL:", `${BACKEND_URL}/transactions/${transaction.id}`);
console.log("DEBUG transaction.id:", transaction.id);
console.log("DEBUG BACKEND_URL:", BACKEND_URL);
console.log("DEBUG nextStatus:", nextStatus);

    await fetch(`${BACKEND_URL}/transactions/${transaction.id}`, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: nextStatus }),
    });

    // 更新後のデータを再取得
    const res = await fetch(`${BACKEND_URL}/transactions/${id}`);
    const updated = await res.json();
    setTransaction(updated);
  };

  if (loading) return <p>読み込み中...</p>;
  if (!transaction) return <p>取引が見つかりません</p>;

  const status = transaction.status;

  const transactionMessages = (messages ?? []).filter(
    (m) => m.transactionId === id
  );

  const handleSend = () => {
    if (!input.trim()) return;

    sendMessage({
      id: Date.now(),
      transactionId: id!,
      userName: user?.name || user?.email || "unknown",
      message: input,
      createdAt: new Date().toISOString(),
    });

    setInput("");
  };

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 20 }}>
      <h1>取引ページ</h1>
      <p>取引ID: {id}</p>

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

      {/* 🔥 ステータスボタン */}
      {user?.role === "buyer" && status === "requested" && (
        <button onClick={advanceStatus}>発送を待つ</button>
      )}

      {user?.role === "seller" && status === "shipping" && (
        <button onClick={advanceStatus}>発送しました</button>
      )}

      {user?.role === "buyer" && status === "shipped" && (
        <button onClick={advanceStatus}>取引を完了する</button>
      )}

      {status === "completed" && (
        <p style={{ marginTop: 20, fontWeight: "bold", color: "green" }}>
          取引が完了しました！
        </p>
      )}
      <p>DEBUG status: {transaction.status}</p>
      <p>DEBUG role: {user?.role}</p>

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
        {transactionMessages.map((m) => (
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