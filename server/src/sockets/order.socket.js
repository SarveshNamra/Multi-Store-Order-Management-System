import { getIO } from "./index.js";

// Emit order created event
export const emitOrderCreated = (storeId, order) => {
    const io = getIO();

    io.to(storeId).emit("order-created", {
        success: true,
        message: "New order created",
        data: order,
    });
};

// Emit order status updated event
export const emitOrderStatusUpdated = (storeId, order) => {
    const io = getIO();

    io.to(storeId).emit("order-status-updated", {
        success: true,
        message: "Order status updated",
        data: order,
    });
};