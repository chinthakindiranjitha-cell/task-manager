import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getAllUsersController = asyncHandler(
  async (req, res) => {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  }
);