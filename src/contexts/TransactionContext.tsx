import { createContext, useContext, useState, useEffect } from "react";
import { BACKEND_URL } from "../constants";


type Transaction = {
  id: string;
  productId: string;
  buyerId: string;
  sellerId: string;
  status: string;
  createdAt: string;
};

type TransactionsContextType = {
  transactions: Transaction[];
  createTransaction: (t: Transaction) => Promise<void>;
  updateTransaction: (id: string, data: Partial<Transaction>) => Promise<void>;
};

const TransactionsContext = createContext<TransactionsContextType | null>(null);

export function TransactionsProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // 初回読み込み
  useEffect(() => {
    fetch(`${BACKEND_URL}/transactions`)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) return setTransactions([]);
        setTransactions(data);
      });
    });


  // 新規取引作成
  const createTransaction = async (t: Transaction) => {
    const res = await fetch(`${BACKEND_URL}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(t),
    });

    const newTx = await res.json();

    // 🔥 ここで完全な取引データを取得する
    const detailRes = await fetch(`${BACKEND_URL}/transactions/${newTx.id}`);
    const fullTx = await detailRes.json();

    setTransactions((prev) => [...prev, fullTx]);

    return fullTx; // ← DM 保存時に使う
  };

  // 取引更新（ステータス変更など）
  const updateTransaction = async (id: string, data: Partial<Transaction>) => {
    const res = await fetch(`${BACKEND_URL}/transactions/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const updated = await res.json();
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === id ? updated : tx))
    );
  };

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction, updateTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const ctx = useContext(TransactionsContext);
  if (!ctx) throw new Error("TransactionsProvider で囲ってください");
  return ctx;
}