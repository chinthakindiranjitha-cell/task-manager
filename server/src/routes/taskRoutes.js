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
  taskIdValidation,
  paginationValidation
} from "../middleware/taskValidation.js";

import { validate } from "../middleware/validationMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  upload.single("attachment"),
  createTaskValidation,
  validate,
  createTaskController
);

router.get(
  "/",
  protect,
  paginationValidation,
  validate,
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
  upload.single("attachment"),
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