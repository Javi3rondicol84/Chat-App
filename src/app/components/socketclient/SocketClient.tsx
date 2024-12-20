"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ChatUi } from "../chatui/ChatUi";
import { getAllMessages, saveMessageInDb } from "@/app/utils/apiMessage";

let socket: Socket | null = null; // Mantener el socket como singleton

export default function SocketClient() {
  const userIdLogged = localStorage.getItem('userLoggedId');
  const secondUserId = localStorage.getItem('secondUserId');
  const nameSecondUser = localStorage.getItem('nameSecondUser');
  const chatId = localStorage.getItem('chatId');

  type Messages = {
    loggedUser: string; 
    message: string;  
    time: string;
  }

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Messages[]>([]);

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

      async function loadMessages() {

        if(chatId != null) {
          try {
            const fetchedMessages = await getAllMessages(chatId);

            if (fetchedMessages && Array.isArray(fetchedMessages)) {
              setMessages(fetchedMessages);
            } else {
              console.error("Expected an array in fetchedMessages.messages");
            }
  
          }
          catch(err) {
            console.log(err);
          }
        }

      }

      loadMessages();
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
      const time = new Date().toLocaleTimeString('en-US', { 
        hour12: false, 
        timeZone: 'America/New_York', // Convert to the 'America/New_York' timezone
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
      socket.emit("sendMessageToUser", {secondUserId: secondUserId, loggedUser: userIdLogged, message: input, time: time});
      //save message in the db for both users
      const saveMessage = async () => {
        if(chatId && userIdLogged && input) {
          await saveMessageInDb(chatId, userIdLogged, input);
        }

      }

      saveMessage();

      setInput(""); // Limpia el input después de enviar
    }
  };

  return (
    <>
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-500 to-indigo-600">
      <h1 className="text-2xl font-semibold text-white mt-8">
        Real-time Chat with <span className="text-yellow-300">{nameSecondUser}</span>
      </h1>
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg mt-6 p-6">
        <ChatUi messages={messages} userId={userIdLogged} nameUser={nameSecondUser} />
        <div className="flex items-center mt-4">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Escribe un mensaje..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            className="flex-grow border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 transition duration-300"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
