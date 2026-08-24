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

    if (req.file) {
      taskData.attachment = {
        fileName: req.file.filename,
        fileUrl: `/uploads/${req.file.filename}`,
        fileType: req.file.mimetype,
        fileSize: req.file.size
      };
    }

    const task =
      await createTask(taskData);

    res.status(201).json({
      success: true,
      message:
        "Task created successfully",
      data: task
    });
  }
);

export const getTasksController = asyncHandler(
  async (req, res) => {
    const page =
      Number(req.query.page) || 1;

    const limit =
      Number(req.query.limit) || 4;

    const search =
      req.query.search?.trim() || "";

    const isAdmin =
      req.user.role === "admin";

    const result =
      await getTasks(
        req.user._id,
        isAdmin,
        page,
        limit,
        search
      );

    res.status(200).json({
      success: true,
      count: result.tasks.length,
      data: result.tasks,
      pagination: result.pagination
    });
  }
);

export const getTaskByIdController =
  asyncHandler(
    async (req, res) => {
      const isAdmin =
        req.user.role === "admin";

      const task =
        await getTaskById(
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

export const updateTaskController =
  asyncHandler(
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

      const isAdmin =
        req.user.role === "admin";

      const task =
        await updateTask(
          req.params.id,
          req.user._id,
          taskData,
          isAdmin
        );

      res.status(200).json({
        success: true,
        message:
          "Task updated successfully",
        data: task
      });
    }
  );

export const deleteTaskController =
  asyncHandler(
    async (req, res) => {
      const isAdmin =
        req.user.role === "admin";

      await deleteTask(
        req.params.id,
        req.user._id,
        isAdmin
      );

      res.status(200).json({
        success: true,
        message:
          "Task deleted successfully"
      });
    }
  );