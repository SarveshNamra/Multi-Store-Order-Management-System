import asyncHandler from "../middleware/async.middleware.js";
import { archiveOldOrders } from "../services/archive.service.js";

// Controller To Archive Orders Older Than 30 Days
export const archiveOldOrdersController =
    asyncHandler(async (req, res) => {
        const archiveResult =
            await archiveOldOrders();

        return res.status(200).json({
            success: true,
            message:
                "Old orders archived successfully",
            data: archiveResult,
        });
    });