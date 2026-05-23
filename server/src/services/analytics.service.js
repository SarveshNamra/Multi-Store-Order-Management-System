import prisma from "../config/db.js";

// Get Orders Per Day
export const getOrdersPerDay = async () => {
    const orders = await prisma.order.groupBy({
        by: ["createdAt"],

        _count: {
            id: true,
        },

        orderBy: {
            createdAt: "asc",
        },
    });

    // Format Orders Per Day
    const formattedOrders = orders.map(
        (order) => ({
            date: order.createdAt
                .toISOString()
                .split("T")[0],

            totalOrders: order._count.id,
        }),
    );

    return formattedOrders;
};

// Get Revenue Per Store
export const getRevenuePerStore =
    async () => {
        const revenue =
            await prisma.order.groupBy({
                by: ["storeId"],

                _sum: {
                    theTotalAmount: true,
                },

                orderBy: {
                    storeId: "asc",
                },
            });

        // Format Revenue Per Store
        return revenue.map((item) => ({
            storeId: item.storeId,

            totalRevenue: Number(
                item._sum.theTotalAmount || 0,
            ),
        }));
    };

// Get Top Selling Items
export const getTopSellingItems =
    async () => {
        const items =
            await prisma.orderItem.groupBy({
                by: ["itemId"],

                _sum: {
                    quantity: true,
                },

                orderBy: {
                    _sum: {
                        quantity: "desc",
                    },
                },

                take: 5,
            });

        // Format Top Selling Items
        return items.map((item) => ({
            itemId: item.itemId,

            totalQuantity: Number(
                item._sum.quantity || 0,
            ),
        }));
    };

// Get Analytics
export const getAnalytics = async () => {
    const [ordersPerDay, revenuePerStore, topSellingItems] = await Promise.all([
        getOrdersPerDay(),
        getRevenuePerStore(),
        getTopSellingItems(),
    ]);

    return {
        ordersPerDay,
        revenuePerStore,
        topSellingItems,
    };
};