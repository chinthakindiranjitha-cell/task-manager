import {
  registerUser,
  loginUser
} from "../services/authService.js";

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

export const loginController = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Login error:", error);

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Login failed"
    });
  }
};

export const logoutController = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax"
  });

  res.status(200).json({
    success: true,
    message: "Logout successful"
  });
};