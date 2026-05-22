import prisma from "../config/db.js";
import { emitOrderCreated, emitOrderStatusUpdated } from "../sockets/order.socket.js";

// Service functions for Order management
export const createOrder = async (payload) => {
    const { storeId, userId, items, theTotalAmount, status } = payload;

    if (!storeId) {
        const error = new Error("Store ID is missing !");
        error.statusCode = 400;
        throw error;
    }

    // auth not implemented yet
    // if (!userId) {
    //     const error = new Error("User ID is missing !");
    //     error.statusCode = 400;
    //     throw error;
    // }

    if (!items || items.length === 0) {
        const error = new Error("At least one order item is required ! Please add some items to the order.");
        error.statusCode = 400;
        throw error;
    }

    console.log({
        storeId,
        theTotalAmount,
        status,
        items,
    });


    const order = await prisma.order.create({
        data: {
            storeId,
            userId,
            theTotalAmount: Number(theTotalAmount),
            status,

            items: {
                create: items.map((item) => ({
                    itemId: item.itemId,
                    quantity: item.quantity,
                })),
            },
        },

        include: {
            items: true,
            user: {
                select: {
                    id: true,
                    email: true,
                },
            },
        },
    });

    // Emit order created event to the store room
    emitOrderCreated(storeId, order);

    return order;
};

// Get Orders By Store with pagination
export const getOrdersByStore = async ({ storeId, page = 1, limit = 10 }) => {
    if (!storeId) {
        const error = new Error("Store ID is missing !");
        error.statusCode = 400;
        throw error;
    }

    const skip = (page - 1) * limit;

    const [orders, totalOrders] = await Promise.all([
        prisma.order.findMany({
            where: {
                storeId,
            },

            include: {
                items: true,
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
            },

            orderBy: {
                createdAt: "desc",
            },

            skip,
            take: limit,
        }),

        prisma.order.count({
            where: {
                storeId,
            },
        }),
    ]);

    const totalPages = Math.ceil(totalOrders / limit);

    return {
        data: orders,

        pagination: {
            total: totalOrders,
            page,
            limit,
            totalPages,
        },
    };
};

// Update Order Status Controller
export const updateOrderStatus = async ( orderId, status ) => {
    const existingOrder = await prisma.order.findUnique({
        where: {
            id: orderId,
        },
    });

    if (!existingOrder) {
        const error = new Error("Order not found");
        error.statusCode = 404;
        throw error;
    }

    const updatedOrder = await prisma.order.update({
        where: {
            id: orderId,
        },

        data: {
            status,
        },

        include: {
            items: true,
            user: {
                select: {
                    id: true,
                    email: true,
                },
            },
        },
    });

    // Emit order status updated event to the store room
    emitOrderStatusUpdated(existingOrder.storeId, updatedOrder);
    
    return updatedOrder;
};