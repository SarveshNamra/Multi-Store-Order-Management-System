import { Router } from "express";
import { createOrderController, getOrdersController, updateOrderStatusController } from "../controllers/order.controller.js";
import { createOrderSchema, updateOrderStatusSchema } from "../validations/order.validation.js";
import validate from "../middleware/validate.middleware.js";

const router = Router();

router.post("/create", validate(createOrderSchema), createOrderController);
router.get("/:storeId", getOrdersController);
router.patch("/:orderId/status", validate(updateOrderStatusSchema), updateOrderStatusController);

export default router;