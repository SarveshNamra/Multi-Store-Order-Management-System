import asyncHandler from "../middleware/async.middleware.js";

import { getOrdersPerDay, getRevenuePerStore, getTopSellingItems } from "../services/analytics.service.js";

// Orders Per Day Analytics
export const getOrdersPerDayController =
    asyncHandler(async (req, res) => {
        const analytics =
            await getOrdersPerDay();

        return res.status(200).json({
            success: true,
            message:
                "Orders per day fetched successfully",
            data: analytics,
        });
    });

// Revenue Per Store Analytics
export const getRevenuePerStoreController =
    asyncHandler(async (req, res) => {
        const analytics =
            await getRevenuePerStore();

        return res.status(200).json({
            success: true,
            message:
                "Revenue per store fetched successfully",
            data: analytics,
        });
    });

// Top Selling Items Analytics
export const getTopSellingItemsController =
    asyncHandler(async (req, res) => {
        const analytics =
            await getTopSellingItems();

        return res.status(200).json({
            success: true,
            message:
                "Top selling items fetched successfully",
            data: analytics,
        });
    });