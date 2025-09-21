import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteProject } from "../Context_slices/projectSlice";
import { useNavigate } from "react-router-dom";

import { fetchAllProjects } from "../Context_slices/projectSlice";
import { useEffect } from "react";

export default function ViewAllProjects() {
  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllProjects());
  }, [dispatch]);

  let allprojects = useSelector((state) => state.project.list);

  return (
    <>
      <h2>All Projects</h2>

      <button onClick={() => navigate("/addProject")}>Go Back</button>

      {allprojects.length == 0 && (
        <div>
          <h3>Np Projects available...</h3>
          <button onClick={() => navigate("/addProject")}>
            Go to Projects
          </button>
        </div>
      )}

      {allprojects && (
        <div
          style={{
            display: "flex",
            width: "90%",
            margin: "auto",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "20px",
            alignItems: "center",
          }}
        >
          {allprojects.map((proj) => (
            <div
              key={proj.id}
              style={{
                border: "2px solid grey",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <h3>{proj.title}</h3>
              <p>{proj.description}</p>
              <button onClick={() => navigate(`/project/${proj.id}`)}>
                View Project
              </button>
              <button onClick={() => dispatch(deleteProject(proj.id))}>
                Delete Project
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
