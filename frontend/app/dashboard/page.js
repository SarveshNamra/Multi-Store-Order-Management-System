"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { fetchOrders } from "@/services/order.service";

import DashboardStats from "@/components/dashboard/DashboardStats";
import StoreSwitcher from "@/components/orders/StoreSwitcher";

const DashboardPage = () => {
    const searchParams = useSearchParams();

    const storeId = searchParams.get("storeId") || "store-1";

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    // Load dashboard data (orders and analytics)
    const loadDashboardData = async () => {
        try {
            setLoading(true);

            setError("");

            const response = await fetchOrders({
                storeId,
                page: 1,
                limit: 100,
            });

            setOrders(response.data.data.data || []);
        }
        catch (error) {
            setError(
                error.message || "Failed to load dashboard",
            );
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDashboardData();
    }, [storeId]);

    // Calculate analytics based on orders data
    const analytics = useMemo(() => {
        const totalOrders = orders.length;

        const pendingOrders = orders.filter(
            (order) => order.status === "PLACED",
        ).length;

        const preparingOrders = orders.filter(
            (order) =>
                order.status === "PREPARING",
        ).length;

        const completedOrders = orders.filter(
            (order) =>
                order.status === "COMPLETED",
        ).length;

        const totalRevenue = orders.reduce(
            (accumulator, order) =>
                accumulator +
                Number(order.theTotalAmount || 0),
            0,
        );

        return {
            totalOrders,
            pendingOrders,
            preparingOrders,
            completedOrders,
            totalRevenue,
        };
    }, [orders]);

    // Get the 5 most recent orders based on creation date
    const recentOrders = [...orders]
        .sort(
            (a, b) =>
                new Date(b.createdAt) -
                new Date(a.createdAt),
        )
        .slice(0, 5);

    return (
        <div className="space-y-8">
            {/* Header */}

            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h1 className="text-4xl font-bold text-blue-900">
                        Dashboard
                    </h1>

                    <p className="mt-2 text-2xl text-gray-500">
                        Monitor realtime store
                        performance and orders.
                    </p>
                </div>

                <StoreSwitcher />
            </div>

            {/* Error State */}

            {error && (
                <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                    {error}
                </div>
            )}

            {/* Stats */}

            <DashboardStats loading={loading} analytics={analytics} />
            <div className=" rounded-2xl border border-gray-200 bg-white p-8 shadow-sm ">
                <h2 className="text-2xl font-semibold text-gray-900">
                    Realtime Multi-Store Order Management
                </h2>

                <p className=" mt-3 max-w-3xl text-sm leading-relaxed text-gray-600 ">
                    Manage and monitor orders across multiple stores with
                    realtime updates, live order tracking, scalable order and
                    management architecture
                </p>
            </div>

        </div>
    );
};

export default DashboardPage;