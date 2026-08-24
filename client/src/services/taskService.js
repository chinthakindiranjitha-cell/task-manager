import api from "./api.js";

export const getTasks = async (
  page = 1,
  limit = 4,
  search = "",
  status = "",
  priority = ""
) => {
  const params = {
    page,
    limit
  };

  if (search) {
    params.search = search;
  }

  if (status) {
    params.status = status;
  }

  if (priority) {
    params.priority = priority;
  }

  const response = await api.get(
    "/api/tasks",
    {
      params
    }
  );

  return response.data;
};

export const getTaskById = async (
  taskId
) => {
  const response = await api.get(
    `/api/tasks/${taskId}`
  );

  return response.data;
};

export const createTask = async (
  taskData
) => {
  const response = await api.post(
    "/api/tasks",
    taskData
  );

  return response.data;
};

export const updateTask = async (
  taskId,
  taskData
) => {
  const response = await api.put(
    `/api/tasks/${taskId}`,
    taskData
  );

  return response.data;
};

export const deleteTask = async (
  taskId
) => {
  const response = await api.delete(
    `/api/tasks/${taskId}`
  );

  return response.data;
};