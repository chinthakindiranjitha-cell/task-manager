import express from "express";

import {
  registerController,
  loginController,
  logoutController
} from "../controllers/authController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerController);

router.post("/login", loginController);

router.post("/logout", protect, logoutController);

export default router;