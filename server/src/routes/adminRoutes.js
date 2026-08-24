import express from "express";
import { param } from "express-validator";

import {
  getAllUsersController,
  deleteUserController,
  getAllTasksController,
  getAdminTaskByIdController,
  updateAdminTaskController,
  deleteTaskController
} from "../controllers/adminController.js";

import { protect } from "../middleware/authMiddleware.js";

import { authorize } from "../middleware/roleMiddleware.js";

import {
  taskIdValidation,
  updateTaskValidation
} from "../middleware/taskValidation.js";

import { validate } from "../middleware/validationMiddleware.js";

import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.use(protect);
router.use(authorize("admin"));

/*
 * USERS
 */

router.get(
  "/users",
  getAllUsersController
);

router.delete(
  "/users/:id",
  param("id")
    .isMongoId()
    .withMessage(
      "Invalid user ID"
    ),
  validate,
  deleteUserController
);

/*
 * TASKS
 */

router.get(
  "/tasks",
  getAllTasksController
);

router.get(
  "/tasks/:id",
  taskIdValidation,
  validate,
  getAdminTaskByIdController
);

router.put(
  "/tasks/:id",
  upload.single("attachment"),
  updateTaskValidation,
  validate,
  updateAdminTaskController
);

router.delete(
  "/tasks/:id",
  taskIdValidation,
  validate,
  deleteTaskController
);

export default router;