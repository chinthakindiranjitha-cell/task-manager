import { body, param, query } from "express-validator";

export const createTaskValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage(
      "Title must be between 3 and 100 characters"
    ),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage(
      "Description cannot exceed 1000 characters"
    ),

  body("status")
    .optional()
    .isIn([
      "pending",
      "in-progress",
      "completed"
    ])
    .withMessage("Invalid task status"),

  body("priority")
    .optional()
    .isIn([
      "low",
      "medium",
      "high"
    ])
    .withMessage("Invalid task priority"),

  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage(
      "Due date must be a valid date"
    )
];

export const updateTaskValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid task ID"),

  body("title")
    .optional()
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage(
      "Title must be between 3 and 100 characters"
    ),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage(
      "Description cannot exceed 1000 characters"
    ),

  body("status")
    .optional()
    .isIn([
      "pending",
      "in-progress",
      "completed"
    ])
    .withMessage("Invalid task status"),

  body("priority")
    .optional()
    .isIn([
      "low",
      "medium",
      "high"
    ])
    .withMessage("Invalid task priority"),

  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage(
      "Due date must be a valid date"
    )
];

export const taskIdValidation = [
  param("id")
    .isMongoId()
    .withMessage("Invalid task ID")
];

export const paginationValidation = [
  query("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage(
      "Page must be a positive integer"
    )
    .toInt(),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage(
      "Limit must be between 1 and 50"
    )
    .toInt()
];