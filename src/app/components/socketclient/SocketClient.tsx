"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ChatUi } from "../chatui/ChatUi";
import { getAllMessages, saveMessageInDb } from "@/app/utils/apiMessage";

let socket: Socket | null = null; // Mantener el socket como singleton

export default function SocketClient() {
  const userIdLogged = localStorage.getItem('userLoggedId');
  const nameUserLogged = localStorage.getItem('nameUserLogged');
  const secondUserId = localStorage.getItem('secondUserId');
  const nameSecondUser = localStorage.getItem('nameSecondUser');
  const chatId = localStorage.getItem('chatId');

  type Messages = {
    loggedUser: string; 
    message: string; 
  }

  // type Messagess = {
  //   content: string;
  //   user_id: string;  
  //   sent_at: string; 
  // }


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

      // async function loadMessages() {
      //   console.log(chatId);
      //   if(chatId != null) {
      //     try {
      //       const fetchedMessages = await getAllMessages(chatId); 
      //       console.log(fetchedMessages);
      //       setMessages(fetchedMessages);
      //     }
      //     catch(err) {
      //       console.log(err);
      //     }
      //   }
      // }

      async function loadMessages() {
        console.log("test");
        console.log(chatId);

        if(chatId != null) {
          try {
            // const fetchedMessages: Messages[] = await getAllMessages(chatId);
            const fetchedMessages = await getAllMessages(chatId);

            if(fetchedMessages != null) {
              console.log(fetchedMessages.messages);
            }
     
            //FIX WITH ALL THE FIELDS OF MESSAGE TABLE
          
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
      socket.emit("sendMessageToUser", {secondUserId: secondUserId, loggedUser: userIdLogged, message: input});
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
      <h1 className="text-blue-600">Chat en tiempo real con {secondUserId} desde {userIdLogged}</h1>
      <ChatUi messages={messages} userId={userIdLogged} nameUser={nameSecondUser}/>
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
