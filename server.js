const express = require('express');
const { createServer } = require('http'); // Import the HTTP server module
const { Server } = require('socket.io'); // Import Socket.IO
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const expressApp = express(); // Create the Express app
  const server = createServer(expressApp); // Create an HTTP server from the Express app
  const io = new Server(server, {
    path: '/socket.io', // Specify the WebSocket path
  });

  // WebSocket events
  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('input-change', (msg) => {
      console.log(`Input received: ${msg}`);
      socket.broadcast.emit('update-input', msg);
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

  // Handle all HTTP requests with Next.js
  expressApp.all('*', (req, res) => {
    return handle(req, res);
  });

  // Start the server
  const PORT = 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
