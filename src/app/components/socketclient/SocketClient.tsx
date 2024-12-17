"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ChatUi } from "../chatui/ChatUi";

let socket: Socket | null = null; // Mantener el socket como singleton

export default function SocketClient() {
  const [input, setInput] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ id: string; text: string }[]>([]);

  useEffect(() => {
    // Inicializar socket si no está conectado
    if (!socket) {
      socket = io("http://192.168.0.26:3000");

      socket.on("connect", () => {
        console.log("Connected to WebSocket server");
      });

      socket.on("userId", (id: string) => setUserId(id));

      socket.on("receiveMessage", (message: { id: string; text: string }) => {
        setMessages((prev) => [...prev, message]);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from WebSocket server");
      });
    }

    // Cleanup para desconectar socket al desmontar componente
    return () => {
      socket?.disconnect();
      socket = null;
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const sendMessage = () => {
    if (input.trim() && socket) {
      socket.emit("sendMessage", input); // Envía el mensaje al servidor
      setInput(""); // Limpia el input después de enviar
    }
  };

  const userIdOtherUser = localStorage.getItem('secondUserId');

  return (
    <>

      <h1 className="text-blue-600">Chat en tiempo real con {userIdOtherUser}</h1>
      <ChatUi messages={messages} userId={userId} />
      <div>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Escribe un mensaje..."
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>

    </>
  );
}
