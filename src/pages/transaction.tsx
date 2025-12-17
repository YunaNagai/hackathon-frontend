import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTransactions } from "../contexts/TransactionContext";
import { useMessages } from "../contexts/MessagesContext";

export default function Transaction() {
  const { user } = useAuth();
  const { id } = useParams(); // /transactions/:id の id
  const { transactions, updateTransaction } = useTransactions();
  const transactionId = Number(id);
  const transaction = transactions.find(t => t.id == transactionId );
  const {messages, sendMessage} = useMessages();
  const [input, setInput] = useState(""); 
  if (!transaction) return <p>取引データを読み込んでいます...</p>;
  // 仮の取引ステータス
  const status = transaction.status;
  const advanceStatus = () => {
    if (status == "requested"&&user?.role == "buyer"){
      updateTransaction(transaction.id, {status: "shipping" });
    }
    if (status == "shipping"&&user?.role=="seller"){
      updateTransaction(transaction.id, {status: "shipped"});
    }
    if (status=="shipped"&&user?.role=="buyer"){
      updateTransaction(transaction.id, {status: "completed"});
    }
  };
  // 仮のメッセージ一覧

  const transactionMessages = messages.filter(
    (m) => m.transactionId == transactionId
  );
  const handleSend = () => {
    if (!input.trim()) return;

    sendMessage({
      id: Date.now(),
      transactionId,
      userName: user?.name ?? "不明",
      message: input,
      createdAt: new Date().toISOString(),
    });

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

      {user?.role=="buyer"&&status=="requested"&&(
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
      {user?.role=="seller"&&status=="shipping"&&(
        <button
          onClick={advanceStatus}
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
      {user?.role=="buyer"&&status === "shipped" && (
  <button
    onClick={advanceStatus}
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
      {status=="completed"&&(
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