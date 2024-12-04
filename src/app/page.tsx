"use client";

import { use, useEffect } from "react";
import { io, Socket} from "socket.io-client";
import { useState } from "react";

let socket: Socket | null = null;

export default function Home() {
  const [input, setInput] = useState('');

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if(socket && socket.connected) {
      socket.emit('input-change', e.target.value);
    }
  }

  useEffect(() => {
    const socketInitializer = async () => {
      console.log('Fetching /api/socket...');
      await fetch('/api/socket'); // Call API to initialize WebSocket server
      socket = io();

      socket.on('connect', () => {
        console.log('Connected to WebSocket server');
      });

      socket.on('update-input', msg => {
        setInput(msg);
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from WebSocket server');
      });
    }

    socketInitializer();

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return (
    <div>
      <h1>Welcome to the homepage!</h1>
      <input
        placeholder="Type something"
        value={input}
        onChange={onChangeHandler}
      />
    </div>
  );
}
