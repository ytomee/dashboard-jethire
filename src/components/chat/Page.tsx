"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { sendMessage, listenForMessages } from "@/services/chatService";

interface Message {
  id?: string;
  sender?: "me" | "other";
  senderId: string;
  name: string;
  avatar: string;
  text: string;
  time: string;
}

export default function ChatPage() {
  const { data: session } = useSession();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [companyId, setCompanyId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanyId = async () => {
      try {
        const res = await fetch("/api/chat/session");
        if (!res.ok) {
          console.error("Erro ao obter companyId:", res.status);
          return;
        }

        const data = await res.json();
        if (data.companyId) {
          setCompanyId(data.companyId);
        } else {
          console.warn("companyId não recebido", data);
        }
      } catch (err) {
        console.error("Erro ao carregar companyId:", err);
      }
    };

    fetchCompanyId();
  }, []);

  useEffect(() => {
    if (!companyId || !session?.user?.id) return;

    const unsubscribe = listenForMessages(companyId, (msg) => {
      const isMe = msg.senderId === session?.user?.id;

      const formattedMessage: Message = {
        ...msg,
        sender: isMe ? "me" : "other",
      };

      setMessages((prev) => [...prev, formattedMessage]);
    });

    return () => unsubscribe();
  }, [companyId, session?.user?.id]);

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim() || !companyId || !session?.user) return;

    const newMessage: Message = {
      senderId: session.user.id,
      name: session.user.name || "Desconhecido",
      avatar: session.user.image || "/images/default/user.png",
      text: message,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    sendMessage(companyId, newMessage);
    setMessage("");
  }

  return (
    <div className="h-[calc(100vh-170px)] flex flex-col justify-between rounded-2xl border border-gray-200 bg-white px-5 py-5 dark:border-gray-800 dark:bg-white/[0.03] xl:px-8 xl:py-8">
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "other" && (
              <Image
                src={msg.avatar}
                alt={msg.name}
                width={100}
                height={100}
                className="h-[45px] w-[45px] rounded-full object-cover object-center"
              />
            )}

            <div className="max-w-xs">
              <div
                className={`px-4 py-2 rounded-2xl text-sm whitespace-pre-line ${
                  msg.sender === "me"
                    ? "bg-brand-600 text-white rounded-br-none"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
              <div
                className={`text-[11px] mt-1 ${
                  msg.sender === "me" ? "text-right" : "text-left"
                } text-gray-500 dark:text-gray-400`}
              >
                {msg.sender === "me" ? "Eu" : msg.name} • {msg.time}
              </div>
            </div>

            {msg.sender === "me" && (
              <Image
                src={msg.avatar}
                alt={msg.name}
                width={100}
                height={100}
                className="h-[45px] w-[45px] rounded-full object-cover object-center"
              />
            )}
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSend}
        className="flex gap-2 pt-4 border-t dark:border-gray-700 mt-6"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Escreve uma mensagem..."
          className="flex-1 rounded-xl border px-4 py-2 text-sm dark:bg-gray-900 dark:border-gray-700 dark:text-white"
        />
        <button
          type="submit"
          className="rounded-xl bg-brand-600 px-4 py-2 text-sm text-white hover:bg-brand-700"
          disabled={!session?.user || !companyId}
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
