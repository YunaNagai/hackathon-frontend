import { createContext, useContext, useState, useEffect } from "react";

type Transaction = {
  id: number;
  productId: number;
  buyerId: string;
  sellerId: string;
  status: string;
  createdAt: string;
};

type TransactionsContextType = {
  transactions: Transaction[];
  createTransaction: (t: Transaction) => Promise<void>;
  updateTransaction: (id: number, data: Partial<Transaction>) => Promise<void>;
};

const TransactionsContext = createContext<TransactionsContextType | null>(null);

export function TransactionsProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // 初回読み込み
  useEffect(() => {
    fetch("http://localhost:3001/transactions")
      .then((res) => res.json())
      .then((data) => setTransactions(data));
  }, []);

  // 新規取引作成
  const createTransaction = async (t: Transaction) => {
    const res = await fetch("http://localhost:3001/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(t),
    });

    const newTx = await res.json();
    setTransactions((prev) => [...prev, newTx]);
  };

  // 取引更新（ステータス変更など）
  const updateTransaction = async (id: number, data: Partial<Transaction>) => {
    const res = await fetch(`http://localhost:3001/transactions/${id}`, {
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