import app from "./app.js";
import dotenv from "dotenv";
import http from "http";
import { initializeSocket } from "./sockets/index.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

// Initialize Socket.IO server
initializeSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});