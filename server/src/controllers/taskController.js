import {
  createTask,
  getTasks
} from "../services/taskService.js";

export const createTaskController = async (req, res) => {
  try {
    const task = await createTask(req.body);

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task
    });
  } catch (error) {
    console.error("Create task error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create task"
    });
  }
};

export const getTasksController = async (req, res) => {
  try {
    const tasks = await getTasks();

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    console.error("Get tasks error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch tasks"
    });
  }
};