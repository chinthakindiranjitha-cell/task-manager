import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} from "../services/taskService.js";

import asyncHandler from "../utils/asyncHandler.js";

export const createTaskController = asyncHandler(
  async (req, res) => {
    const {
      title,
      description,
      status,
      priority,
      dueDate
    } = req.body;

    const taskData = {
      title,
      description,
      status,
      priority,
      dueDate,
      createdBy: req.user._id
    };

    const task = await createTask(taskData);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task
    });
  }
);

export const getTasksController = asyncHandler(
  async (req, res) => {
    const isAdmin = req.user.role === "admin";

    const tasks = await getTasks(
      req.user._id,
      isAdmin
    );

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  }
);

export const getTaskByIdController = asyncHandler(
  async (req, res) => {
    const isAdmin = req.user.role === "admin";

    const task = await getTaskById(
      req.params.id,
      req.user._id,
      isAdmin
    );

    res.status(200).json({
      success: true,
      data: task
    });
  }
);

export const updateTaskController = asyncHandler(
  async (req, res) => {
    const {
      title,
      description,
      status,
      priority,
      dueDate
    } = req.body;

    const taskData = {
      title,
      description,
      status,
      priority,
      dueDate
    };

    Object.keys(taskData).forEach((key) => {
      if (taskData[key] === undefined) {
        delete taskData[key];
      }
    });

    const isAdmin = req.user.role === "admin";

    const task = await updateTask(
      req.params.id,
      req.user._id,
      taskData,
      isAdmin
    );

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task
    });
  }
);

export const deleteTaskController = asyncHandler(
  async (req, res) => {
    const isAdmin = req.user.role === "admin";

    await deleteTask(
      req.params.id,
      req.user._id,
      isAdmin
    );

    res.status(200).json({
      success: true,
      message: "Task deleted successfully"
    });
  }
);