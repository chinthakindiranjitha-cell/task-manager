import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";
import AdminRoute from "./components/AdminRoute.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Tasks from "./pages/Tasks.jsx";
import CreateTask from "./pages/CreateTask.jsx";
import EditTask from "./pages/EditTask.jsx";
import AdminDashboard
  from "./pages/AdminDashboard.jsx";
import AdminEditTask
  from "./pages/AdminEditTask.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to="/dashboard"
                replace
              />
            }
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route element={<ProtectedRoute />}>
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/tasks"
              element={<Tasks />}
            />

            <Route
              path="/tasks/create"
              element={<CreateTask />}
            />

            <Route
              path="/tasks/:id/edit"
              element={<EditTask />}
            />
            <Route element={<AdminRoute />}>
              <Route
                path="/admin"
                element={<AdminDashboard />}
              />
              <Route
                path="/admin/tasks/:id/edit"
                element={<AdminEditTask />}
              />
            </Route>

          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;