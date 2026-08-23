import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Tasks from "./pages/Tasks.jsx";
import CreateTask from "./pages/CreateTask.jsx";
import EditTask from "./pages/EditTask.jsx";

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
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;