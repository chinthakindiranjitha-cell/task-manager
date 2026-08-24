import {
  useEffect,
  useState
} from "react";

import {
  Link
} from "react-router-dom";

import {
  getAllUsers,
  deleteUser,
  getAllTasks,
  deleteAdminTask
} from "../services/adminService.js";

const AdminDashboard = () => {
  const [users, setUsers] =
    useState([]);

  const [tasks, setTasks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        usersResponse,
        tasksResponse
      ] = await Promise.all([
        getAllUsers(),
        getAllTasks()
      ]);

      setUsers(usersResponse.data);
      setTasks(tasksResponse.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load admin data"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleDeleteUser = async (
    userId
  ) => {
    const confirmed =
      window.confirm(
        "Delete this user and all their tasks?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteUser(userId);

      await fetchAdminData();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete user"
      );
    }
  };

  const handleDeleteTask = async (
    taskId
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this task?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setError("");

      await deleteAdminTask(taskId);

      setTasks((currentTasks) =>
        currentTasks.filter(
          (task) =>
            task._id !== taskId
        )
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete task"
      );
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        <p className="text-gray-600">
          Loading admin dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-gray-600 mt-2">
          Manage users and tasks.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      {/* Statistics */}
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">
            Total Users
          </p>

          <p className="text-3xl font-bold mt-2">
            {users.length}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">
            Total Tasks
          </p>

          <p className="text-3xl font-bold mt-2">
            {tasks.length}
          </p>
        </div>
      </div>

      {/* Users */}
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-5">
          Users
        </h2>

        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-4">
                    Name
                  </th>

                  <th className="text-left px-6 py-4">
                    Email
                  </th>

                  <th className="text-left px-6 py-4">
                    Role
                  </th>

                  <th className="text-right px-6 py-4">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map(
                  (user) => (
                    <tr
                      key={user._id}
                      className="border-t"
                    >
                      <td className="px-6 py-4">
                        {user.name}
                      </td>

                      <td className="px-6 py-4">
                        {user.email}
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full bg-gray-100 text-sm">
                          {user.role}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        {user.role !== "admin" && (
                          <button
                            onClick={() =>
                              handleDeleteUser(
                                user._id
                              )
                            }
                            className="text-red-600 hover:text-red-800 font-medium"
                          >
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Tasks */}
      <section>
        <h2 className="text-2xl font-bold mb-5">
          Tasks
        </h2>

        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left px-6 py-4">
                    Title
                  </th>

                  <th className="text-left px-6 py-4">
                    User
                  </th>

                  <th className="text-left px-6 py-4">
                    Status
                  </th>

                  <th className="text-left px-6 py-4">
                    Priority
                  </th>

                  <th className="text-right px-6 py-4">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {tasks.map(
                  (task) => (
                    <tr
                      key={task._id}
                      className="border-t"
                    >
                      <td className="px-6 py-4 font-medium">
                        {task.title}
                      </td>

                      <td className="px-6 py-4">
                        {task.createdBy?.name ||
                          "Unknown"}
                      </td>

                      <td className="px-6 py-4">
                        {task.status}
                      </td>

                      <td className="px-6 py-4">
                        {task.priority}
                      </td>

                      <td className="px-6 py-4 text-right">
  <div className="flex justify-end gap-4">
    <Link
      to={`/admin/tasks/${task._id}/edit`}
      className="text-blue-600 hover:text-blue-800 font-medium"
    >
      Edit
    </Link>

    <button
      onClick={() =>
        handleDeleteTask(
          task._id
        )
      }
      className="text-red-600 hover:text-red-800 font-medium"
    >
      Delete
    </button>
  </div>
</td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;