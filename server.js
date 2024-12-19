const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();


app.prepare().then(() => {
  const expressApp = express();
  const server = createServer(expressApp);
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
    path: "/socket.io",
  });

  const userSockets = {};
  const sockets = {};

  // WebSocket events
  io.on("connection", (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.emit("userId", socket.id); // Enviar userId al cliente

    socket.on("registerUser", (userLoggedId) => {
      userSockets[userLoggedId] = socket.id;
      sockets[socket.id] = userLoggedId;
    });

    socket.on("sendMessageToUser", ({secondUserId, loggedUser, message, time}) => {
      const targetSocketId = userSockets[secondUserId];

      if(targetSocketId) {
        io.to([targetSocketId, socket.id]).emit("receiveMessage", {loggedUser, message, time});
      }
      else {
        console.log(`User ${secondUserId} is not connected.`);
      }

    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  // Manejar peticiones HTTP con Next.js
  expressApp.all("*", (req, res) => handle(req, res));

  // Iniciar servidor
  const PORT = 3000;
  server.listen(PORT, "0.0.0.0", (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
