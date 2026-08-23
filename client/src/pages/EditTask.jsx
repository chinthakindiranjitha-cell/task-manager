import {
  useEffect,
  useState
} from "react";

import {
  Link,
  useNavigate,
  useParams
} from "react-router-dom";

import {
  getTaskById,
  updateTask
} from "../services/taskService.js";

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    dueDate: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response =
          await getTaskById(id);

        const task = response.data;

        setFormData({
          title: task.title || "",
          description:
            task.description || "",
          status: task.status || "pending",
          priority:
            task.priority || "medium",
          dueDate: task.dueDate
            ? task.dueDate.slice(0, 10)
            : ""
        });
      } catch (error) {
        setError(
          error.response?.data?.message ||
            "Failed to load task"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      const taskData = {
        ...formData
      };

      if (!taskData.dueDate) {
        delete taskData.dueDate;
      }

      await updateTask(
        id,
        taskData
      );

      navigate("/tasks");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to update task"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-10">
        <p className="text-lg text-gray-600">
          Loading task...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Edit Task
        </h1>

        <p className="text-gray-600 mt-2">
          Update your task information.
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-2xl p-8 space-y-6"
      >
        <div>
          <label className="block font-medium mb-2">
            Title
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Description
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-2">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="pending">
                Pending
              </option>

              <option value="in-progress">
                In Progress
              </option>

              <option value="completed">
                Completed
              </option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">
              Priority
            </label>

            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-3"
            >
              <option value="low">
                Low
              </option>

              <option value="medium">
                Medium
              </option>

              <option value="high">
                High
              </option>
            </select>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2">
            Due Date
          </label>

          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-6 py-3 rounded-lg font-semibold"
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>

          <Link
            to="/tasks"
            className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-lg"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default EditTask;