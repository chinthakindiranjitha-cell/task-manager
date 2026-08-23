import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import taskRoutes from "./routes/taskRoutes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
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

app.use("/api/tasks", taskRoutes);

export default app;