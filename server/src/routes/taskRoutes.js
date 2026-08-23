import express from "express";

import {
  createTaskController,
  getTasksController
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/", createTaskController);

router.get("/", getTasksController);

export default router;