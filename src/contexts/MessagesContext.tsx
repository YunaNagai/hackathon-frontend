import { createContext, useContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../constants";


export type Message = {
  id: number;
  transactionId: string;
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
    fetch(`${BACKEND_URL}/messages`)
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  const sendMessage = async (msg: Message) => {
    const res = await fetch(`${BACKEND_URL}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(msg),
    });

    const newMsg = await res.json();
    setMessages((prev) => [...prev, msg]);
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