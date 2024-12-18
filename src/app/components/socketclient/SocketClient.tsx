"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ChatUi } from "../chatui/ChatUi";

let socket: Socket | null = null; // Mantener el socket como singleton

export default function SocketClient() {
  const userIdLogged = localStorage.getItem('userLoggedId');
  const secondUserId = localStorage.getItem('secondUserId');

  const [input, setInput] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ loggedUser: string; message: string }[]>([]);

  useEffect(() => {
    // Inicializar socket si no está conectado
    if (!socket) {
      socket = io("http://192.168.0.26:3000");

      socket.on("connect", () => {
        console.log("Connected to WebSocket server");
      });

      socket.emit("registerUser", userIdLogged);

      socket.on("receiveMessage", (message) => {
        setMessages((prev) => [...prev, message]);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from WebSocket server");
      });
    }

    // Cleanup and disconnect
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
      socket.emit("sendMessageToUser", {secondUserId: secondUserId, loggedUser: userIdLogged, message: input});
      setInput(""); // Limpia el input después de enviar
    }
  };

  return (
    <>
      <h1 className="text-blue-600">Chat en tiempo real con {secondUserId} desde {userIdLogged}</h1>
      <ChatUi messages={messages} userId={userIdLogged} />
      <div>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Escribe un mensaje..."
          onKeyDown={(e) => {
            if(e.key == 'Enter') {
              sendMessage();
            }
          }}
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>

    </>
  );
}
