import { Server } from "Socket.IO";

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server, {
      transports: ["websocket"],
      pingTimeout: 10000,
      pingInterval: 30000,
      cors: {
        origin: "*",
      },
    });
    res.socket.server.io = io;
    io.on("connection", (socket) => {
      socket.on("input-change", (msg) => {
        console.log("msg", msg);
        socket.broadcast.emit("update-input", 'message recived from client');
      });
    });
  }
  res.end();
};

export default SocketHandler;
