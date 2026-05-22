import asyncHandler from "../middleware/async.middleware.js";
import { createOrder, getOrdersByStore, updateOrderStatus } from "../services/order.service.js";

// Controller functions for Order management
export const createOrderController = asyncHandler(
    async (req, res) => {
        const order = await createOrder({
            ...req.body,
            // userId: req.user.id,
        });

        return res.status(201).json({
            success: true,
            message: "Order created Successfully",
            data: order,
        });
    },
);

// Get orders for a specific store with pagination
export const getOrdersController = asyncHandler(
    async (req, res) => {
        const { storeId } = req.params;

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const orders = await getOrdersByStore({ storeId, page, limit });

        return res.status(200).json({
            success: true,
            message: "Orders fetched Successfully",
            data: orders,
        });
    },
);

// Update order status
export const updateOrderStatusController = asyncHandler(
    async (req, res) => {
        const { orderId } = req.params;
        const { status } = req.body;

        const updatedOrder = await updateOrderStatus( orderId, status );

        return res.status(200).json({
            success: true,
            message: "Order status updated Successfully",
            data: updatedOrder,
        });
    },
);