import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
    autoConnect: true,
    reconnection: true,
    reconnectionAttempts: 6,
    reconnectionDelay: 1000,
    transports: ["websocket"],
});

export default socket;