import express from "express";

import {
  registerController,
  loginController,
  logoutController,
  getCurrentUserController
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

import {
  registerValidation,
  loginValidation
} from "../middleware/authValidation.js";

import { validate } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  registerValidation,
  validate,
  registerController
);

router.post(
  "/login",
  loginValidation,
  validate,
  loginController
);

router.get(
  "/me",
  protect,
  getCurrentUserController
);

router.post(
  "/logout",
  protect,
  logoutController
);

export default router;