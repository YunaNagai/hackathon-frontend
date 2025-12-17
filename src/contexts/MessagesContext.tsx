import { createContext, useContext, useEffect, useState } from "react";

export type Message = {
  id: number;
  transactionId: number;
  userName: string;
  message: string;
  createdAt: string;
};

type MessagesContextType = {
  messages: Message[];
  sendMessage: (msg: Message) => Promise<void>;
};

const MessagesContext = createContext<MessagesContextType | null>(null);

export function MessagesProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<Message[]>([]);

  // 初回読み込み
  useEffect(() => {
    fetch("http://localhost:3001/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  const sendMessage = async (msg: Message) => {
    const res = await fetch("http://localhost:3001/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(msg),
    });

    const newMsg = await res.json();
    setMessages((prev) => [...prev, newMsg]);
  };

  return (
    <MessagesContext.Provider value={{ messages, sendMessage }}>
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessages() {
  const ctx = useContext(MessagesContext);
  if (!ctx) throw new Error("MessagesProvider で囲ってください");
  return ctx;
}