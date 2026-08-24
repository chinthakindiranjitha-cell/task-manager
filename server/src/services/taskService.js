import Task from "../models/Task.js";
import AppError from "../utils/AppError.js";

export const createTask = async (taskData) => {
  const task = await Task.create(taskData);

  return task.populate(
    "createdBy",
    "name email"
  );
};

export const getTasks = async (
  userId,
  isAdmin = false,
  page = 1,
  limit = 4,
  search = ""
) => {
  const filter = isAdmin
    ? {}
    : { createdBy: userId };

  if (search) {
    filter.$or = [
      {
        title: {
          $regex: search,
          $options: "i"
        }
      },
      {
        description: {
          $regex: search,
          $options: "i"
        }
      }
    ];
  }

  const skip = (page - 1) * limit;

  const [tasks, totalTasks] =
    await Promise.all([
      Task.find(filter)
        .populate(
          "createdBy",
          "name email"
        )
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Task.countDocuments(filter)
    ]);

  const totalPages = Math.ceil(
    totalTasks / limit
  );

  return {
    tasks,
    pagination: {
      page,
      limit,
      totalTasks,
      totalPages,
      hasNextPage:
        page < totalPages,
      hasPreviousPage:
        page > 1
    }
  };
};

export const getTaskById = async (
  taskId,
  userId,
  isAdmin = false
) => {
  const filter = isAdmin
    ? { _id: taskId }
    : {
        _id: taskId,
        createdBy: userId
      };

  const task = await Task.findOne(
    filter
  ).populate(
    "createdBy",
    "name email"
  );

  if (!task) {
    throw new AppError(
      "Task not found",
      404
    );
  }

  return task;
};

export const updateTask = async (
  taskId,
  userId,
  taskData,
  isAdmin = false
) => {
  const filter = isAdmin
    ? { _id: taskId }
    : {
        _id: taskId,
        createdBy: userId
      };

  const task =
    await Task.findOneAndUpdate(
      filter,
      taskData,
      {
        new: true,
        runValidators: true
      }
    ).populate(
      "createdBy",
      "name email"
    );

  if (!task) {
    throw new AppError(
      "Task not found",
      404
    );
  }

  return task;
};

export const deleteTask = async (
  taskId,
  userId,
  isAdmin = false
) => {
  const filter = isAdmin
    ? { _id: taskId }
    : {
        _id: taskId,
        createdBy: userId
      };

  const task =
    await Task.findOneAndDelete(filter);

  if (!task) {
    throw new AppError(
      "Task not found",
      404
    );
  }

  return task;
};