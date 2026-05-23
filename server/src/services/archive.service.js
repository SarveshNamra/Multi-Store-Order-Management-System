import prisma from "../config/db.js";

// Service To Archive Orders Older Than 30 Days
export const archiveOldOrders = async () => {

    // Get Date 30 Days Ago
    const THIRTY_DAYS_AGO = new Date();

    THIRTY_DAYS_AGO.setDate(
        THIRTY_DAYS_AGO.getDate() - 30,
    );

    // Fetch Orders Older Than 30 Days
    const oldOrders = await prisma.order.findMany({
        where: {
            createdAt: {
                lt: THIRTY_DAYS_AGO,
            },
        },

        include: {
            items: true,
        },
    });

    if (oldOrders.length === 0) {
        return {
            archivedCount: 0,
            archivedOrders: [],
        };
    }

    // Prepare Archive Data
    const archiveData = oldOrders.map((order) => ({
        id: order.id,
        storeId: order.storeId,
        userId: order.userId,

        theTotalAmount: order.theTotalAmount,
        status: order.status,

        createdAt: order.createdAt,
        archivedAt: new Date(),

        items: order.items.map((item) => ({
            id: item.id,
            itemId: item.itemId,
            quantity: item.quantity,
        })),
    }));

    // Use Transaction To Ensure Atomicity
    await prisma.$transaction(async (tx) => {

        // Insert Into Archive
        await tx.orderArchive.createMany({
            data: archiveData,
        });

        // Delete Old Orders
        await tx.order.deleteMany({
            where: {
                id: {
                    in: oldOrders.map(
                        (order) => order.id,
                    ),
                },
            },
        });
    });

    // Return Summary
    const archivedOrders = oldOrders.map(
        (order) => ({
            id: order.id,
            storeId: order.storeId,
            status: order.status,
            createdAt: order.createdAt,
        }),
    );

    return {
        archivedCount: oldOrders.length,
        archivedOrders,
    };
};