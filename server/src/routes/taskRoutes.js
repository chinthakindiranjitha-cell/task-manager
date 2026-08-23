import express from "express";

import {
  createTaskController,
  getTasksController,
  getTaskByIdController,
  updateTaskController,
  deleteTaskController
} from "../controllers/taskController.js";

import { protect } from "../middleware/authMiddleware.js";

import {
  createTaskValidation,
  updateTaskValidation,
  taskIdValidation
} from "../middleware/taskValidation.js";

import { validate } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  createTaskValidation,
  validate,
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
  taskIdValidation,
  validate,
  getTaskByIdController
);

router.put(
  "/:id",
  protect,
  updateTaskValidation,
  validate,
  updateTaskController
);

router.delete(
  "/:id",
  protect,
  taskIdValidation,
  validate,
  deleteTaskController
);

export default router;