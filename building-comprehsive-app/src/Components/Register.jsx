import React from "react";
import { useReducer } from "react";
import { auth } from "../JS_Files/firebase";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
export default function Register() {
  let navigate = useNavigate();
  const [user, dispatch] = useReducer(signinuser, {
    email: "",
    name: "",
    password: "",
    submitted: false,
  });

  function signinuser(user, action) {
    switch (action.type) {
      case "name":
        return { ...user, name: action.payload };
      case "email":
        return { ...user, email: action.payload };
      case "password":
        return { ...user, password: action.payload };
      case "submitted":
        return { ...user, submitted: true };
      default:
        return user;
    }
  }
  function handleChange(e) {
    const { name, value } = e.target;
    dispatch({ type: name, payload: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );
      setTimeout(() => {
        navigate("/login");
        console.log(user);
        console.log(userCredential.user);
      }, 3000);
    } catch (error) {
      console.log(error.message);
    }

    dispatch({ type: "submitted" });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2>Regster here</h2>
        <input
          type="text"
          placeholder="Enter Your Name:"
          value={user.name}
          name="name"
          onChange={handleChange}
        />
        <br />
        <input
          type="email"
          placeholder="Enter Your Email"
          value={user.email}
          name="email"
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          placeholder="Enter Your Password"
          value={user.password}
          name="password"
          onChange={handleChange}
        />
        <br />
        <button type="submit">Register</button>
        <p>Already have an Account?</p>{" "}
        <button onClick={() => navigate("/login")}>Sign In</button>
      </form>
    </>
  );
}
