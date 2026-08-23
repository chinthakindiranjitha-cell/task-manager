import express from "express";

import {
  createTaskController,
  getTasksController,
  getTaskByIdController,
  updateTaskController,
  deleteTaskController
} from "../controllers/taskController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createTaskController
);

router.get(
  "/",
  protect,
  getTasksController
);

router.get(
  "/:id",
  protect,
  getTaskByIdController
);

router.put(
  "/:id",
  protect,
  updateTaskController
);

router.delete(
  "/:id",
  protect,
  deleteTaskController
);

export default router;