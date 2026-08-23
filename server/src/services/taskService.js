import Task from "../models/Task.js";

export const createTask = async (taskData) => {
  const task = await Task.create(taskData);

  return task;
};

export const getTasks = async (userId) => {
  const tasks = await Task.find({
    createdBy: userId
  })
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 });

  return tasks;
};