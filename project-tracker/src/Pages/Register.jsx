import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../Context_slices/authSlice";
import { useContext } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { use } from "react";
import { clearError } from "../Context_slices/authSlice";

export default function Register() {
  let dispatch = useDispatch();
  let error = useSelector((state) => state.auth.error);
  const userData = useSelector((state) => state.auth.user);
  let loading = useSelector((state) => state.auth.loading);

  let navigate = useNavigate();
  let [user, setUser] = useState({
    email: "",
    password: "",
    role: "user",
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (user.email == "" || user.password == "")
      return alert("Enter valid details");
    else {
      dispatch(registerUser(user));
    }
  }
  useEffect(() => {
    if (userData) {
      alert("Success");
      navigate("/login");
    }
  }, [userData]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  function handleChange(e) {
    const { name, value } = e.target;

    setUser((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <>
      <h1>Please Register here</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Your Email"
          value={user.email}
          onChange={handleChange}
          name="email"
        />
        <input
          type="password"
          placeholder="Enter Your Password"
          value={user.password}
          onChange={handleChange}
          name="password"
        />
        <select
          name="role"
          value={user.role}
          onChange={handleChange}
          placeholder="Select the role"
        >
          <option value="admin">Admin</option>
          <option value="user">user</option>
        </select>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>
          Already have an account?
          <button type="button" onClick={() => navigate("/login")}>
            Login
          </button>
        </p>

        <button type="submit">Register</button>
      </form>
    </>
  );
}
