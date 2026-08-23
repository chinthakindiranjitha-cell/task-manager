import {
  registerUser,
  loginUser
} from "../services/authService.js";

import asyncHandler from "../utils/asyncHandler.js";

export const registerController = asyncHandler(
  async (req, res) => {
    const user = await registerUser(req.body);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  }
);

export const loginController = asyncHandler(
  async (req, res) => {
    const { email, password } = req.body;

    const { user, token } = await loginUser(
      email,
      password
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  }
);

export const logoutController = asyncHandler(
  async (req, res) => {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax"
    });

    res.status(200).json({
      success: true,
      message: "Logout successful"
    });
  }
);