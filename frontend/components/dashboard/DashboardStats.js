const DashboardStats = ({ analytics, loading }) => {
    const stats = [
        {
            title: "Total Orders",
            value: analytics.totalOrders,
        },
        {
            title: "Pending Orders",
            value: analytics.pendingOrders,
        },
        {
            title: "Preparing Orders",
            value: analytics.preparingOrders,
        },
        {
            title: "Completed Orders",
            value: analytics.completedOrders,
        },
        {
            title: "Total Revenue",
            value: `₹${analytics.totalRevenue.toFixed(2)}`,
        },
    ];

    return (
        <div className=" grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-5 ">
            {stats.map((stat) => (
                <div key={stat.title} className=" rounded-2xl border border-gray-200 bg-white p-6 shadow-sm ">
                    <p className="text-sm text-gray-500">
                        {stat.title}
                    </p>

                    <h2 className=" mt-3 text-3xl font-bold text-gray-900 ">
                        {loading ? "..." : stat.value}
                    </h2>
                </div>
            ))}
        </div>
    );
};

export default DashboardStats;