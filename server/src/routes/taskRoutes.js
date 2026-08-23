import express from "express";

import {
  createTaskController,
  getTasksController
} from "../controllers/taskController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getTasksController);

router.post("/", protect, createTaskController);

export default router;