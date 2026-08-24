import {
  useEffect,
  useState
} from "react";

import { Link } from "react-router-dom";

import {
  getTasks,
  deleteTask
} from "../services/taskService.js";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);

  const [search, setSearch] =
    useState("");

  const [pagination, setPagination] =
    useState({
      page: 1,
      limit: 4,
      totalTasks: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false
    });

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [deletingId, setDeletingId] =
    useState(null);

  const fetchTasks = async (
    page = 1,
    searchValue = search
  ) => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getTasks(
          page,
          pagination.limit,
          searchValue
        );

      setTasks(response.data);

      setPagination(
        response.pagination
      );
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
    fetchTasks(1, "");
  }, []);

  const handleSearch = (
    event
  ) => {
    event.preventDefault();

    fetchTasks(1, search);
  };

  const handleClearSearch = () => {
    setSearch("");

    fetchTasks(1, "");
  };

  const handlePageChange = (
    newPage
  ) => {
    fetchTasks(
      newPage,
      search
    );
  };

  const handleDelete = async (
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
      setDeletingId(taskId);
      setError("");

      await deleteTask(taskId);

      const currentPage =
        pagination.page;

      const response =
        await getTasks(
          currentPage,
          pagination.limit,
          search
        );

      if (
        response.data.length === 0 &&
        currentPage > 1
      ) {
        await fetchTasks(
          currentPage - 1,
          search
        );
      } else {
        setTasks(response.data);

        setPagination(
          response.pagination
        );
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete task"
      );
    } finally {
      setDeletingId(null);
    }
  };

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

      {/* Search */}
      <form
        onSubmit={handleSearch}
        className="bg-white rounded-2xl shadow p-5 mb-8"
      >
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search tasks..."
            className="flex-1 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Search
          </button>

          {search && (
            <button
              type="button"
              onClick={
                handleClearSearch
              }
              className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-lg font-semibold"
            >
              Clear
            </button>
          )}
        </div>
      </form>

      {error && (
        <div className="mb-6 rounded-lg bg-red-100 p-4 text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-10">
          <p className="text-gray-600">
            Loading tasks...
          </p>
        </div>
      ) : tasks.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-10 text-center">
          <h2 className="text-xl font-semibold">
            {search
              ? "No matching tasks found"
              : "No tasks yet"}
          </h2>

          <p className="text-gray-600 mt-2 mb-6">
            {search
              ? "Try a different search term."
              : "Create your first task to get started."}
          </p>

          {!search && (
            <Link
              to="/tasks/create"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
            >
              Create Task
            </Link>
          )}
        </div>
      ) : (
        <>
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

                {task.attachment && (
                  <div className="mt-4">
                    <a
                      href={`http://localhost:5000${task.attachment.fileUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline text-sm font-medium"
                    >
                      📎 View Attachment
                    </a>
                  </div>
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
                      handleDelete(
                        task._id
                      )
                    }
                    disabled={
                      deletingId ===
                      task._id
                    }
                    className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white py-2 rounded-lg"
                  >
                    {deletingId ===
                    task._id
                      ? "Deleting..."
                      : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              onClick={() =>
                handlePageChange(
                  pagination.page - 1
                )
              }
              disabled={
                !pagination.hasPreviousPage
              }
              className="px-5 py-2 rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {Array.from(
                {
                  length:
                    pagination.totalPages
                },
                (_, index) =>
                  index + 1
              ).map(
                (pageNumber) => (
                  <button
                    key={
                      pageNumber
                    }
                    onClick={() =>
                      handlePageChange(
                        pageNumber
                      )
                    }
                    className={`w-10 h-10 rounded-lg ${
                      pagination.page ===
                      pageNumber
                        ? "bg-blue-600 text-white"
                        : "border hover:bg-gray-100"
                    }`}
                  >
                    {pageNumber}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() =>
                handlePageChange(
                  pagination.page + 1
                )
              }
              disabled={
                !pagination.hasNextPage
              }
              className="px-5 py-2 rounded-lg border disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
            >
              Next
            </button>
          </div>

          <p className="text-center text-sm text-gray-500 mt-4">
            Showing page{" "}
            {pagination.page} of{" "}
            {pagination.totalPages}{" "}
            ({pagination.totalTasks}{" "}
            tasks)
          </p>
        </>
      )}
    </div>
  );
};

export default Tasks;