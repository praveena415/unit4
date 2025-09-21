import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProject } from "../Context_slices/projectSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateProject() {
  let navigate = useNavigate();

  let dispatch = useDispatch();
  let allprojects = useSelector((state) => state.project);

  useEffect(() => {
    console.log("Projects updated:", allprojects);
  }, [allprojects]);

  let [project, setProject] = useState({
    title: "",
    description: "",
  });

  function handleChange(e) {
    let { name, value } = e.target;
    setProject((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (project.title == "" || project.description == "")
      return alert("Enter valid details");
    let newP = { ...project, createdAt: Date.now(), tasks: {} };
    dispatch(addProject(newP));
    setProject({ title: "", description: "" });
  }

  return (
    <>
      <h1>Create a New Project</h1>
      <button onClick={() => navigate("/allProjects")}>
        View All Projects
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={project.title}
          placeholder="Enter Project Title"
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Enter Project Desctiption"
          rows={10}
          cols={50}
          value={project.description}
          onChange={handleChange}
        ></textarea>

        <button type="submit">Create Project</button>
      </form>
    </>
  );
}
