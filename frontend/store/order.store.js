import { create } from "zustand";

const useOrderStore = create((set) => ({
    orders: [],
    loading: false,
    error: null,

    pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
    },

    // Set the list of orders and pagination information
    setOrders: (orders, pagination = {}) =>
        set(() => ({
            // orders: [...orders],
            orders: Array.isArray(orders) ? [...orders] : [],

            pagination: {
                total: pagination.total || 0,
                page: pagination.page || 1,
                limit: pagination.limit || 10,
                totalPages: pagination.totalPages || 0,
            },
        })),

    // Add a new order to the list of orders
    addOrder: (order) =>
        set((state) => {
            const orderExists = state.orders.some(
                (existingOrder) => existingOrder.id === order.id,
            );

            if (orderExists) {
                return state;
            }

            return {
                orders: [order, ...state.orders],
            };
        }),

    // Update the status of an existing order
    updateOrderStatus: (updatedOrder) =>
        set((state) => ({
            orders: state.orders.map(
                (order) => order.id === updatedOrder.id ? { ...order, ...updatedOrder } : order,
            ),
        })),

    // Handle real-time order created event
    handleRealtimeOrderCreated: (payload) =>
        set((state) => {
            const newOrder = payload.data;

            const orderExists = state.orders.some(
                (order) => order.id === newOrder.id,
            );

            if (orderExists) {
                return state;
            }

            return {
                orders: [newOrder, ...state.orders],
            };
        }),

    // Handle real-time order status updated event
    handleRealtimeOrderStatusUpdated: (payload) =>
        set((state) => {
            const updatedOrder = payload.data;

            return {
                orders: state.orders.map(
                    (order) => order.id === updatedOrder.id ? { ...order, ...updatedOrder } : order,
                ),
            };
        }),

    // set the loading state
    setLoading: (loading) =>
        set(() => ({
            loading,
        })),

    setError: (error) =>
        set(() => ({
            error,
        })),
}));

export default useOrderStore;