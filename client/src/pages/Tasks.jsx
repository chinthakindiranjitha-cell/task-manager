import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getTasks,
  deleteTask
} from "../services/taskService.js";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const fetchTasks = async () => {
    try {
      setError("");

      const response = await getTasks();

      setTasks(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load tasks"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(taskId);
      setError("");

      await deleteTask(taskId);

      setTasks((currentTasks) =>
        currentTasks.filter(
          (task) => task._id !== taskId
        )
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete task"
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        <p className="text-lg text-gray-600">
          Loading tasks...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Tasks
          </h1>

          <p className="text-gray-600 mt-2">
            Manage your tasks.
          </p>
        </div>

        <Link
          to="/tasks/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold"
        >
          Create Task
        </Link>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      {tasks.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-10 text-center">
          <h2 className="text-xl font-semibold">
            No tasks yet
          </h2>

          <p className="text-gray-600 mt-2 mb-6">
            Create your first task to get started.
          </p>

          <Link
            to="/tasks/create"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
          >
            Create Task
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-2xl shadow p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-bold">
                  {task.title}
                </h2>

                <span className="text-xs font-semibold uppercase bg-gray-100 px-3 py-1 rounded-full">
                  {task.priority}
                </span>
              </div>

              <p className="text-gray-600 mt-4 min-h-12">
                {task.description ||
                  "No description"}
              </p>

              <div className="mt-5">
                <span className="inline-block rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-sm font-medium">
                  {task.status}
                </span>
              </div>

              {task.dueDate && (
                <p className="text-sm text-gray-500 mt-4">
                  Due:{" "}
                  {new Date(
                    task.dueDate
                  ).toLocaleDateString()}
                </p>
              )}

              <div className="flex gap-3 mt-6">
                <Link
                  to={`/tasks/${task._id}/edit`}
                  className="flex-1 text-center bg-amber-500 hover:bg-amber-600 text-white py-2 rounded-lg"
                >
                  Edit
                </Link>

                <button
                  onClick={() =>
                    handleDelete(task._id)
                  }
                  disabled={
                    deletingId === task._id
                  }
                  className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white py-2 rounded-lg"
                >
                  {deletingId === task._id
                    ? "Deleting..."
                    : "Delete"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;