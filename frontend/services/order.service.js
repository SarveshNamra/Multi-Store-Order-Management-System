import api from "@/lib/axios";

// Fetch orders for a specific store with pagination
export const fetchOrders = async ({storeId, page = 1, limit = 10}) => {
    if (!storeId) {
        const error = new Error("Store ID is missing !");
        error.statusCode = 400;
        throw error;
    }

    try {
        const response = await api.get(`/orders/${storeId}`,
            { 
                params: { page, limit, }, 
            },
        );

        console.log(response.data);
        
        return response.data;
    }
    catch (error) {
        throw (
            error.response?.data || 
            { success: false, message: "Failed to fetch orders", }
        );
    }
};

// Create a new order
export const createOrder = async (payload) => {
    try {
        const response = await api.post("/orders/create", payload);

        return response.data;
    }
    catch (error) {
        throw (
            error.response?.data || 
            { success: false, message: "Failed to create order", }
        );
    }
};

// Update the status of an existing order
export const updateOrderStatus = async (orderId, status) => {
    if (!orderId) {
        const error = new Error("Order ID is missing !");
        error.statusCode = 400;
        throw error;
    }

    try {
        const response = await api.patch(`/orders/${orderId}/status`,
            { status, },
        );

        return response.data;
    }
    catch (error) {
        throw ( error.response?.data || 
            { success: false, message: "Failed to update order status", } 
        );
    }
};