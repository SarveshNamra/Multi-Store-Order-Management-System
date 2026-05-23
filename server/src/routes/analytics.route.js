import { Router } from "express";

import { getOrdersPerDayController, getRevenuePerStoreController, getTopSellingItemsController } from "../controllers/analytics.controller.js";

const router = Router();

router.get("/orders-per-day", getOrdersPerDayController);
router.get("/revenue-per-store", getRevenuePerStoreController);
router.get("/top-selling-items", getTopSellingItemsController);

export default router;