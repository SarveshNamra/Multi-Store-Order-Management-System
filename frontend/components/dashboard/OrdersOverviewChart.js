"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const OrdersOverviewChart = ({analytics}) => {
    const chartData = [
        {
            name: "Placed",
            value: analytics.pendingOrders,
        },
        {
            name: "Preparing",
            value: analytics.preparingOrders,
        },
        {
            name: "Completed",
            value: analytics.completedOrders,
        },
    ];

    return (
        <div className=" rounded-2xl border border-gray-200 bg-white p-6 shadow-sm ">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                    Orders By Status
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Overview of current order states.
                </p>
            </div>

            <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="name" />

                        <YAxis />

                        <Tooltip />

                        <Bar dataKey="value" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default OrdersOverviewChart;