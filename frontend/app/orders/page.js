"use client";

import { useEffect } from "react";
import OrdersTable from "@/components/orders/OrdersTable";
import useOrderStore from "@/store/order.store";

import { fetchOrders } from "@/services/order.service";
import { useSearchParams } from "next/navigation";

import socket from "@/socket/socket";
import StoreSwitcher from "@/components/orders/StoreSwitcher";

const OrdersPage = () => {
    const { orders, loading, error, pagination, setOrders, setLoading, setError, 
        handleRealtimeOrderCreated, handleRealtimeOrderStatusUpdated,
    } = useOrderStore();

    // Get Orders By Store with pagination
    // This function will be called when the page loads and when the user changes the page
    const searchParams = useSearchParams();

    const storeId = searchParams.get("storeId");

    const loadOrders = async (page = 1) => {
        try {
            setLoading(true);
            setError(null);

            if (!storeId) {
                setError("Store ID is required");
                return;
            }

            const response = await fetchOrders({
                storeId,
                page,
                limit: 10,
            });

            setOrders(
                response.data.data,
                response.data.pagination,
            );
        }
        catch (error) {
            setError(
                error.message || "Failed to fetch orders",
            );
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, [storeId]);

    useEffect(() => {
        if (!storeId) {
            return;
        }

        socket.emit("join-store", storeId);

        socket.on(
            "order-created",
            handleRealtimeOrderCreated,
        );

        // // Temporarily log the payload to verify the structure and data received from the server
        // socket.on("order-created", (payload) => {
        //     console.log("Realtime order received:", payload);

        //     handleRealtimeOrderCreated(payload);
        // });


        socket.on(
            "order-status-updated",
            handleRealtimeOrderStatusUpdated,
        );

        return () => {
            socket.emit("leave-store", storeId);

            socket.off(
                "order-created",
                handleRealtimeOrderCreated,
            );

            socket.off(
                "order-status-updated",
                handleRealtimeOrderStatusUpdated,
            );
        };
    }, [
        storeId,
        handleRealtimeOrderCreated,
        handleRealtimeOrderStatusUpdated,
    ]);

    return (
        <div className="space-y-6">
            {/* Header */}

            <div>
                <h1 className="text-4xl font-bold text-orange-900 text-center">
                    Orders
                </h1>

                <p className="mt-2 text-2xl text-gray-500 text-center">
                    Manage and monitor all store orders.
                </p>
            </div>

            {/* Error State */}

            {error && (
                <div className=" rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 ">
                    {error}
                </div>
            )}

            {/* Store Switcher */}

            <StoreSwitcher />

            {/* Orders Table */}

            <OrdersTable orders={orders} loading={loading} />


            {/* Pagination */}

            {!loading && pagination.totalPages > 1 && (
                <div className=" flex items-center justify-between rounded-2xl border border-gray-200 bg-white p-4 ">
                    <button disabled={pagination.page === 1}
                        onClick={() => loadOrders(pagination.page - 1) }
                        className=" rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium transition
                         hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        Previous
                    </button>

                    <p className="text-sm text-gray-600">
                        Page {pagination.page} of{" "}
                        {pagination.totalPages}
                    </p>

                    <button
                        disabled={
                            pagination.page ===
                            pagination.totalPages
                        }
                        onClick={() =>
                            loadOrders(
                                pagination.page + 1,
                            )
                        }
                        className=" rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:opacity-90
                            disabled:cursor-not-allowed disabled:opacity-50 "
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default OrdersPage;