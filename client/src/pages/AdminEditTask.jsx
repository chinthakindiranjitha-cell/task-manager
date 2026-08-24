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
  getAdminTaskById,
  updateAdminTask
} from "../services/adminService.js";

const AdminEditTask = () => {
  const {
    id
  } = useParams();

  const navigate =
    useNavigate();

  const [
    formData,
    setFormData
  ] = useState({
    title: "",
    description: "",
    status: "pending",
    priority: "medium",
    dueDate: ""
  });

  const [
    attachment,
    setAttachment
  ] = useState(null);

  const [
    currentAttachment,
    setCurrentAttachment
  ] = useState(null);

  const [
    taskOwner,
    setTaskOwner
  ] = useState(null);

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    saving,
    setSaving
  ] = useState(false);

  const [
    error,
    setError
  ] = useState("");

  useEffect(() => {
    const fetchTask =
      async () => {
        try {
          setLoading(true);

          const response =
            await getAdminTaskById(
              id
            );

          const task =
            response.data;

          setFormData({
            title:
              task.title || "",
            description:
              task.description ||
              "",
            status:
              task.status ||
              "pending",
            priority:
              task.priority ||
              "medium",
            dueDate:
              task.dueDate
                ? task.dueDate.slice(
                    0,
                    10
                  )
                : ""
          });

          setCurrentAttachment(
            task.attachment ||
              null
          );

          setTaskOwner(
            task.createdBy ||
              null
          );
        } catch (error) {
          setError(
            error.response?.data
              ?.message ||
              "Failed to load task"
          );
        } finally {
          setLoading(false);
        }
      };

    fetchTask();
  }, [id]);

  const handleChange = (
    event
  ) => {
    setFormData({
      ...formData,
      [event.target.name]:
        event.target.value
    });
  };

  const handleFileChange = (
    event
  ) => {
    const file =
      event.target.files[0];

    setAttachment(
      file || null
    );
  };

  const handleSubmit = async (
    event
  ) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");

      const data =
        new FormData();

      data.append(
        "title",
        formData.title
      );

      data.append(
        "description",
        formData.description
      );

      data.append(
        "status",
        formData.status
      );

      data.append(
        "priority",
        formData.priority
      );

      if (
        formData.dueDate
      ) {
        data.append(
          "dueDate",
          formData.dueDate
        );
      }

      if (attachment) {
        data.append(
          "attachment",
          attachment
        );
      }

      await updateAdminTask(
        id,
        data
      );

      navigate("/admin");
    } catch (error) {
      setError(
        error.response?.data
          ?.message ||
          "Failed to update task"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-10">
        <p className="text-gray-600">
          Loading task...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Edit User Task
        </h1>

        <p className="text-gray-600 mt-2">
          Admin can modify this task.
        </p>
      </div>

      {taskOwner && (
        <div className="mb-6 bg-blue-50 rounded-xl p-5">
          <p className="text-sm text-gray-500">
            Task Owner
          </p>

          <p className="font-semibold mt-1">
            {taskOwner.name}
          </p>

          <p className="text-sm text-gray-600">
            {taskOwner.email}
          </p>
        </div>
      )}

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
            value={
              formData.title
            }
            onChange={
              handleChange
            }
            className="w-full border rounded-lg px-4 py-3"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-2">
            Description
          </label>

          <textarea
            name="description"
            value={
              formData.description
            }
            onChange={
              handleChange
            }
            rows="5"
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block font-medium mb-2">
              Status
            </label>

            <select
              name="status"
              value={
                formData.status
              }
              onChange={
                handleChange
              }
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
              value={
                formData.priority
              }
              onChange={
                handleChange
              }
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
            value={
              formData.dueDate
            }
            onChange={
              handleChange
            }
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        {currentAttachment && (
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="font-medium">
              Current Attachment
            </p>

            <a
              href={`http://localhost:5000${currentAttachment.fileUrl}`}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              {
                currentAttachment.fileName
              }
            </a>
          </div>
        )}

        <div>
          <label className="block font-medium mb-2">
            Replace Attachment
          </label>

          <input
            type="file"
            onChange={
              handleFileChange
            }
            accept=".jpg,.jpeg,.png,.webp,.pdf,.txt"
            className="w-full border rounded-lg px-4 py-3"
          />

          <p className="text-sm text-gray-500 mt-2">
            JPG, PNG, WEBP, PDF or TXT —
            maximum 5 MB.
          </p>

          {attachment && (
            <p className="text-sm text-gray-700 mt-2">
              New file:{" "}
              {attachment.name}
            </p>
          )}
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
            to="/admin"
            className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-lg"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AdminEditTask;