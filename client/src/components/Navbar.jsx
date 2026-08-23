import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/dashboard"
          className="text-xl font-bold"
        >
          Task Manager
        </Link>

        {user && (
          <div className="flex items-center gap-6">
            <Link
              to="/dashboard"
              className="hover:text-blue-300"
            >
              Dashboard
            </Link>

            <Link
              to="/tasks"
              className="hover:text-blue-300"
            >
              Tasks
            </Link>

            {user.role === "admin" && (
              <Link
                to="/admin"
                className="hover:text-blue-300"
              >
                Admin
              </Link>
            )}

            <span className="text-sm text-gray-300">
              {user.name}
            </span>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;