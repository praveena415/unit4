import React, { useEffect } from "react";

import { useState } from "react";
import { addTask, deleteTask, toggleTask } from "./taskSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Task() {
  let dispatch = useDispatch();
  let tasks = useSelector((state) => state.Task.value);
  const [ntask, setNtask] = useState({ title: "", status: false });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNtask((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  useEffect(() => {
    console.log("Updated tasks:", tasks);
  }, [tasks]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (ntask.title.trim() === "") {
      return alert("Enter a valid Task Title:");
    }
    console.log("Submitting task:", ntask);
    let newTask = {
      ...ntask,
      id: crypto.randomUUID(),
    };
    dispatch(addTask(newTask));

    setNtask({ title: "", status: false });
  };

  // You can dispatch this using Redux Toolkit

  return (
    <>
      <h2>TaskList App using Redux ToolKit</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Enter the Task Title"
          value={ntask.title}
          onChange={handleChange}
        />
        <label>
          Completed:
          <input
            type="checkbox"
            name="status"
            checked={ntask.status}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add Task</button>
      </form>
      <div>
        <h3>My Tasks</h3>
        {tasks.length == 0 && <p>No tasks Available...</p>}
        {tasks.length > 0 &&
          tasks.map((task, index) => (
            <div key={index}>
              <span style={{ padding: "30px", margin: "20px" }}>
                <b>Title:</b>
                {task.title}
                <b>Status:</b>
                {task.status ? "Completed" : "Pending"}
                <button onClick={() => dispatch(toggleTask(task.id))}>
                  {task.status ? "Mark as Pending" : "Mark as Completed"}
                </button>
                <button onClick={() => dispatch(deleteTask(task.id))}>
                  Delete Task{" "}
                </button>
              </span>
            </div>
          ))}
      </div>
    </>
  );
}
