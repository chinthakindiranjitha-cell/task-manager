import Task from "../models/Task.js";
import AppError from "../utils/AppError.js";

export const getAllTasksForAdmin =
  async () => {
    const tasks = await Task.find({})
      .populate(
        "createdBy",
        "name email role"
      )
      .sort({ createdAt: -1 });

    return tasks;
  };

export const getTaskForAdmin =
  async (taskId) => {
    const task =
      await Task.findById(taskId)
        .populate(
          "createdBy",
          "name email role"
        );

    if (!task) {
      throw new AppError(
        "Task not found",
        404
      );
    }

    return task;
  };

export const updateTaskAsAdmin =
  async (
    taskId,
    taskData
  ) => {
    const task =
      await Task.findByIdAndUpdate(
        taskId,
        taskData,
        {
          new: true,
          runValidators: true
        }
      ).populate(
        "createdBy",
        "name email role"
      );

    if (!task) {
      throw new AppError(
        "Task not found",
        404
      );
    }

    return task;
  };

export const deleteTaskAsAdmin =
  async (taskId) => {
    const task =
      await Task.findByIdAndDelete(
        taskId
      );

    if (!task) {
      throw new AppError(
        "Task not found",
        404
      );
    }

    return task;
  };