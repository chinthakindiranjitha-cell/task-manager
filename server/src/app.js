import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

import { notFound } from "./middleware/notFoundMiddleware.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();
const uploadDirectory = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../uploads"
);

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());


app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Task Manager API is running"
  });
});

app.use(
  "/uploads",
  express.static(uploadDirectory)
);

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/admin", adminRoutes);

app.use(notFound);

app.use(errorHandler);

export default app;