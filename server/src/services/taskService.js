import Task from "../models/Task.js";
import "../models/User.js";

export const createTask = async (taskData) => {
  const task = await Task.create(taskData);

  return task;
};

export const getTasks = async () => {
  const tasks = await Task.find()
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 });

  return tasks;
};