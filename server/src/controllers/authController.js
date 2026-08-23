import { registerUser } from "../services/authService.js";

export const registerController = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Registration error:", error);

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Registration failed"
    });
  }
};