import { Server } from 'socket.io';

const SocketHandler = (req: any, res: any) => {
  console.log('Socket handler called'); // Log to confirm handler is being invoked

  const server: any = res.socket.server;

  if (server.io) {
    console.log('Socket is already running');
  } else {
    console.log('Socket is initializing');
    const io = new Server(server, {
      path: '/socket.io', // Ensure the path is defined
    });
    server.io = io;

    // Listen for incoming socket connections
    io.on('connection', (socket: any) => {
      console.log('A user connected');

      socket.on('input-change', (msg: any) => {
          socket.broadcast.emit('update-input', msg);
      });

      socket.on('disconnect', () => {
        console.log('A user disconnected');
      });
    });
  }

  res.end();
};

export default SocketHandler;
