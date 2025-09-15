import React from "react";
import { auth } from "../JS_Files/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useReducer } from "react";

export default function Login() {
  let navigate = useNavigate();

  const [input, dispatch] = useReducer(signin, {
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;

    dispatch({ type: name, payload: value });
  }

  function signin(input, action) {
    switch (action.type) {
      case "email":
        return { ...input, email: action.payload, msg: false };
      case "password":
        return { ...input, password: action.payload, msg: false };
      case "empty":
        return { ...input, msg: true };
      default:
        throw new error("!!!!!!!Error !!!11");
    }
  }

  async function handleLogin(e) {
    e.preventDefault();

    if (input.email == "" || input.password == "") {
      return dispatch({ type: "empty" });
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        input.email,
        input.password
      );
      navigate("/dashboard");
      console.log(userCredential.user);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <>
      <h1>Login here</h1>
      <form onSubmit={handleLogin}>
        <input
          name="email"
          onChange={handleChange}
          placeholder="Email"
          value={input.email}
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          value={input.password}
          placeholder="Password"
        />
        <button type="submit">Login</button>
        <p>Don't have any account?</p>{" "}
        <button onClick={() => navigate("/register")}>Register</button>
      </form>
      {input.msg && <p>Invalid Details</p>}
    </>
  );
}
