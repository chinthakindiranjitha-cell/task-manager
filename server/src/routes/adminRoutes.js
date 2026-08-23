import express from "express";

import { getAllUsersController } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/users",
  protect,
  authorize("admin"),
  getAllUsersController
);

export default router;