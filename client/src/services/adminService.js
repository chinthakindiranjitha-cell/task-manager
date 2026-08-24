import api from "./api.js";

export const getAllUsers =
  async () => {
    const response =
      await api.get(
        "/api/admin/users"
      );

    return response.data;
  };

export const deleteUser =
  async (userId) => {
    const response =
      await api.delete(
        `/api/admin/users/${userId}`
      );

    return response.data;
  };

export const getAllTasks =
  async () => {
    const response =
      await api.get(
        "/api/admin/tasks"
      );

    return response.data;
  };

export const getAdminTaskById =
  async (taskId) => {
    const response =
      await api.get(
        `/api/admin/tasks/${taskId}`
      );

    return response.data;
  };

export const updateAdminTask =
  async (
    taskId,
    taskData
  ) => {
    const response =
      await api.put(
        `/api/admin/tasks/${taskId}`,
        taskData
      );

    return response.data;
  };

export const deleteAdminTask =
  async (taskId) => {
    const response =
      await api.delete(
        `/api/admin/tasks/${taskId}`
      );

    return response.data;
  };