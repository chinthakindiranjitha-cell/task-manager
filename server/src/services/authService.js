import bcrypt from "bcryptjs";
import User from "../models/User.js";

import { generateToken } from "../utils/jwt.js";
import AppError from "../utils/AppError.js";

export const registerUser = async (userData) => {
  const { name, email, password } = userData;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new AppError(
      "User already exists",
      409
    );
  }

  const hashedPassword = await bcrypt.hash(
    password,
    10
  );

  const user = await User.create({
    name,
    email,
    password: hashedPassword
  });

  return user;
};

export const loginUser = async (
  email,
  password
) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(
      "Invalid email or password",
      401
    );
  }

  const isPasswordCorrect =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isPasswordCorrect) {
    throw new AppError(
      "Invalid email or password",
      401
    );
  }

  const token = generateToken(
    user._id.toString()
  );

  return {
    user,
    token
  };
};