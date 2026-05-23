import { Router } from "express";
import { archiveOldOrdersController } from "../controllers/archive.controller.js";

const router = Router();

router.post("/archive-old-orders", archiveOldOrdersController);

export default router;