"use client";

import { useState } from "react";
import { updateOrderStatus } from "@/services/order.service";
import useOrderStore from "@/store/order.store";

const STATUS_OPTIONS = [
    "PLACED",
    "PREPARING",
    "COMPLETED",
];

const OrdersTable = ({orders, loading}) => {
    const [updatingOrderId, setUpdatingOrderId] = useState(null);

    const { updateOrderStatus: updateOrderInStore } = useOrderStore();

    // Handle Status Change
    const handleStatusChange = async (orderId, status) => {
        try {
            setUpdatingOrderId(orderId);

            // Update the status in the store
            updateOrderInStore({
                id: orderId,
                status,
            });

            // Update the status on the server
            await updateOrderStatus(orderId, status);
        }
        catch (error) {
            console.error(
                "Failed to update order status:",
                error,
            );
        }
        finally {
            setUpdatingOrderId(null);
        }
    };

    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="border-b border-gray-200 bg-gray-50">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                Order ID
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                Store ID
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                Status
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                Total Amount
                            </th>

                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                                Created At
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-10 text-center text-sm text-gray-500">
                                    Loading orders...
                                </td>
                            </tr>
                        ) : orders.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="px-6 py-10 text-center text-sm text-gray-500">
                                    No orders found.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id} className="border-b border-gray-100 transition hover:bg-gray-50">
                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        {order.id}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-gray-600">
                                        {order.storeId}
                                    </td>

                                    <td className="px-6 py-4">
                                        <select value={order.status} disabled={updatingOrderId === order.id}
                                            onChange={(event) => handleStatusChange(order.id, event.target.value)}
                                            className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xsfont-semibold
                                            text-gray-700 outline-none transition focus:border-black disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            {STATUS_OPTIONS.map((status) => (
                                                <option key={status} value={status}>
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                    </td>

                                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                        ₹
                                        {Number(order.theTotalAmount).toFixed(2)}
                                    </td>

                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {new Date(order.createdAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrdersTable;