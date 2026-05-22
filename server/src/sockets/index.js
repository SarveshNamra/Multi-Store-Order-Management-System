import { Server } from "socket.io";

let io = null;

// Initialize Socket.IO server
export const initializeSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST", "PATCH"],
            credentials: true,
        },
    });

    // Handle socket connections
    io.on("connection", (socket) => {
        console.log(`Socket connected: ${socket.id}`);

        socket.on("join-store", (storeId) => {
            socket.join(storeId);

            console.log(`Socket ${socket.id} joined store room: ${storeId}`);
        });

        socket.on("leave-store", (storeId) => {
            socket.leave(storeId);

            console.log(`Socket ${socket.id} left store room: ${storeId}`);
        });

        socket.on("disconnect", () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });

    return io;
};

// Helper function to get the Socket.IO instance
export const getIO = () => {
    if (!io) {
        throw new Error("Socket.IO is not initialized");
    }

    return io;
};