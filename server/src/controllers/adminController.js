import User from "../models/User.js";

import asyncHandler from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

import {
  getAllTasksForAdmin,
  getTaskForAdmin,
  updateTaskAsAdmin,
  deleteTaskAsAdmin
} from "../services/adminTaskService.js";

import Task from "../models/Task.js";

export const getAllUsersController =
  asyncHandler(async (req, res) => {
    const users =
      await User.find({})
        .select("-password")
        .sort({
          createdAt: -1
        });

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  });

export const deleteUserController =
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (
      id === req.user._id.toString()
    ) {
      throw new AppError(
        "You cannot delete your own admin account",
        400
      );
    }

    const user =
      await User.findByIdAndDelete(id);

    if (!user) {
      throw new AppError(
        "User not found",
        404
      );
    }

    await Task.deleteMany({
      createdBy: id
    });

    res.status(200).json({
      success: true,
      message:
        "User and associated tasks deleted successfully"
    });
  });

export const getAllTasksController =
  asyncHandler(async (req, res) => {
    const tasks =
      await getAllTasksForAdmin();

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  });

export const getAdminTaskByIdController =
  asyncHandler(async (req, res) => {
    const task =
      await getTaskForAdmin(
        req.params.id
      );

    res.status(200).json({
      success: true,
      data: task
    });
  });

export const updateAdminTaskController =
  asyncHandler(async (req, res) => {
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

    Object.keys(taskData).forEach(
      (key) => {
        if (
          taskData[key] === undefined
        ) {
          delete taskData[key];
        }
      }
    );

    if (req.file) {
      taskData.attachment = {
        fileName: req.file.filename,
        fileUrl: `/uploads/${req.file.filename}`,
        fileType: req.file.mimetype,
        fileSize: req.file.size
      };
    }

    const task =
      await updateTaskAsAdmin(
        req.params.id,
        taskData
      );

    res.status(200).json({
      success: true,
      message:
        "Task updated successfully by admin",
      data: task
    });
  });

export const deleteTaskController =
  asyncHandler(async (req, res) => {
    await deleteTaskAsAdmin(
      req.params.id
    );

    res.status(200).json({
      success: true,
      message:
        "Task deleted successfully"
    });
  });