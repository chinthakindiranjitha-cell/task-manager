import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} from "../services/taskService.js";

export const createTaskController = async (req, res) => {
  try {
    const taskData = {
      ...req.body,
      createdBy: req.user._id
    };

    const task = await createTask(taskData);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task
    });
  } catch (error) {
    console.error("Create task error:", error);

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to create task"
    });
  }
};

export const getTasksController = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Get tasks error:", error);

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to fetch tasks"
    });
  }
};

export const getTaskByIdController = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Get task error:", error);

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to fetch task"
    });
  }
};

export const updateTaskController = async (req, res) => {
  try {
    const isAdmin = req.user.role === "admin";

    const task = await updateTask(
      req.params.id,
      req.user._id,
      req.body,
      isAdmin
    );

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task
    });
  } catch (error) {
    console.error("Update task error:", error);

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to update task"
    });
  }
};

export const deleteTaskController = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("Delete task error:", error);

    res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || "Failed to delete task"
    });
  }
};