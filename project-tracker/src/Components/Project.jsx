import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectById } from "../Context_slices/projectSlice";

import {
  addTaskToProject,
  deleteTask,
  toggleTaskStatus,
  updateTask,
  setSearchTerm,
  setFilter,
  setSortBy,
  setPage,
  selectProcessedTasks,
} from "../Context_slices/taskSlice";

export default function SingleProject() {
  let { id } = useParams();
  let dispatch = useDispatch();
  let navigate = useNavigate();

  let {
    selected: project,
    loading,
    error,
  } = useSelector((state) => state.project);

   const taskFilters = useSelector((state) => state.tasks);

  const processedTasks = project
    ? selectProcessedTasks(project.tasks, taskFilters)
    : [];

  let [task, setTask] = useState({
    title: "",
    description: "",
    completed: false,
    priority: "low",
    dueDate: "",
  });

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(fetchProjectById(id));
  }, [id, dispatch]);

  if (loading) return <h3>Loading project...</h3>;
  if (error) return <h3>Error: {error}</h3>;
  if (!project) return <h3>No project found.</h3>;

  function handleChange(e) {
    const { name, value, type } = e.target;
    let val = value;
    if (name === "completed") {     
      val = value === "true";
    }
    setTask((prev) => ({
      ...prev,
      [name]: val,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(addTaskToProject({ projectId: id, task })).then(() => {
      dispatch(fetchProjectById(id));
      setTask({
        title: "",
        description: "",
        completed: false,
        priority: "low",
        dueDate: "",
      });
    });
  }

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    dispatch(setSearchTerm(value));
  };

  return (
    <>
      <h2>{project.title}</h2>
      <p>{project.description}</p>

      <h2>Add a New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Task Title"
          value={task.title}
          name="title"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Task Description"
          value={task.description}
          onChange={handleChange}
        ></textarea>

        <label>
          Status:
          <select
            name="completed"
            value={task.completed}
            onChange={handleChange}
          >
            <option value={false}>Pending</option>
            <option value={true}>Completed</option>
          </select>
        </label>

        <label>
          Priority:
          <select name="priority" value={task.priority} onChange={handleChange}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>

        <label>
          Due Date:
          <input
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Add Task</button>
      </form>

      <div style={{ marginTop: "2rem" }}>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          placeholder="Search tasks..."
        />

        <select
          value={taskFilters.filter.priority}
          onChange={(e) => dispatch(setFilter({ priority: e.target.value }))}
        >
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          value={taskFilters.sortBy}
          onChange={(e) => dispatch(setSortBy(e.target.value))}
        >
          <option value="createdAt">Created Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      <h3>All Tasks</h3>
      {processedTasks.length > 0 ? (
        <div>
          {processedTasks.map((task) => (
            <div
              key={task.id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                margin: "1rem 0",
              }}
            >
              <h4>{task.title}</h4>
              <p>{task.description}</p>
              <p>Status: {task.completed ? "Completed" : "Pending"}</p>
              <p>Priority: {task.priority}</p>
              <p>Due Date: {task.dueDate}</p>

              <button
                onClick={() =>
                  dispatch(
                    toggleTaskStatus({
                      projectId: id,
                      taskId: task.id,
                      currentStatus: task.completed,
                    })
                  ).then(() => dispatch(fetchProjectById(id)))
                }
              >
                Toggle Status
              </button>

              <button
                onClick={() =>
                  dispatch(deleteTask({ projectId: id, taskId: task.id })).then(
                    () => dispatch(fetchProjectById(id))
                  )
                }
              >
                Delete Task
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No tasks found.</p>
      )}
    </>
  );
}
