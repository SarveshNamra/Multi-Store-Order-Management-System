const RecentOrdersTable = ({ orders, loading }) => {
    return (
        <div className=" rounded-2xl border border-gray-200 bg-white p-6 shadow-sm ">
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                    Recent Orders
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Latest 5 realtime orders.
                </p>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr className=" border-b border-gray-200 ">
                            <th className=" px-4 py-3 text-left text-sm font-semibold text-gray-600 ">
                                Order
                            </th>

                            <th className=" px-4 py-3 text-left text-sm font-semibold text-gray-600 ">
                                Status
                            </th>

                            <th className=" px-4 py-3 text-left text-sm font-semibold text-gray-600 ">
                                Amount
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="3" className=" px-4 py-10 text-center text-sm text-gray-500 ">
                                    Loading recent
                                    orders...
                                </td>
                            </tr>
                        ) : orders.length === 0 ? (
                            <tr>
                                <td colSpan="3" className=" px-4 py-10 text-center text-sm text-gray-500 ">
                                    No recent orders
                                    found.
                                </td>
                            </tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id} className=" border-b border-gray-100 ">
                                    <td className=" px-4 py-4 text-sm font-medium text-gray-900 ">
                                        {order.id.slice( 0, 10, )}
                                        ...
                                    </td>

                                    <td className=" px-4 py-4 ">
                                        <span className=" rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700 ">
                                            {order.status}
                                        </span>
                                    </td>

                                    <td className=" px-4 py-4 text-sm font-semibold text-gray-900 ">
                                        ₹
                                        {Number(
                                            order.theTotalAmount,
                                        ).toFixed(2)}
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

export default RecentOrdersTable;