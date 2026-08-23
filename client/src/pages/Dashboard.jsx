import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Welcome, {user?.name}
        </h1>

        <p className="text-gray-600 mt-2">
          Manage your tasks from your dashboard.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Link
          to="/tasks"
          className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-xl font-bold mb-2">
            My Tasks
          </h2>

          <p className="text-gray-600">
            View and manage your tasks.
          </p>
        </Link>

        <Link
          to="/tasks/create"
          className="bg-blue-600 text-white p-6 rounded-2xl shadow hover:bg-blue-700 transition"
        >
          <h2 className="text-xl font-bold mb-2">
            Create Task
          </h2>

          <p className="text-blue-100">
            Create a new task.
          </p>
        </Link>

        {user?.role === "admin" && (
          <Link
            to="/admin"
            className="bg-slate-900 text-white p-6 rounded-2xl shadow hover:bg-slate-800 transition"
          >
            <h2 className="text-xl font-bold mb-2">
              Admin Panel
            </h2>

            <p className="text-gray-300">
              Manage users and application data.
            </p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Dashboard;