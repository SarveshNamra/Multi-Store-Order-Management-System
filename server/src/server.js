import app from "./app.js";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

dotenv.config();
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// Initialize Socket.IO server
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Handle Socket.IO connections
io.on("connection", (socket) => {
  console.log(`Socket Connected and its id : ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`Socket Disconnected and its id : ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});