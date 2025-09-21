import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../Context_slices/authSlice";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { clearError } from "../Context_slices/authSlice";

export default function Login() {
  let dispatch = useDispatch();
  const {
    user: loggedInUser,
    loginSuccess,
    error,
    loading,
  } = useSelector((state) => state.auth);

  let navigate = useNavigate();
  let [user, setUser] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  function handleSubmit(e) {
    e.preventDefault();
    if (user.email == "" || user.password == "")
      return alert("Enter valid details");

    dispatch(loginUser(user));
    console.log("Login ok");
  }
  useEffect(() => {
    if (loginSuccess) {
      if (loggedInUser?.role == "admin") navigate("/admin");
      else if (loggedInUser?.role == "user") navigate("/user");
    }
  }, [loggedInUser, loginSuccess, navigate]);

  function handleChange(e) {
    const { name, value } = e.target;

    setUser((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <>
      <h1>Please Login here</h1>
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>
          Dont have an account?
          <button type="button" onClick={() => navigate("/register")}>
            Register
          </button>
        </p>

        <button type="submit">Login</button>
      </form>
    </>
  );
}
