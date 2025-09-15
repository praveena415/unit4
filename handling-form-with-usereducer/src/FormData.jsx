import React from "react";
import { useReducer } from "react";

export default function FormData() {
  let initialState = {
    email: "",
    password: "",
    error: false,
  };
  const [state, dispatch] = useReducer(updateState, initialState);

  const { email, password } = state;

  function updateState(state, action) {
    switch (action.type) {
      case "email":
        return {
          ...state,
          email: action.payload,
          error: false,
        };
      case "password":
        return {
          ...state,
          password: action.payload,
          error: false,
        };
      case "Eror":
        return {
          ...state,
          error: "Invalid",
        };
      case "submit":
        if (!state.email || !state.password) {
          return { ...state, error: true, submitted: false };
        }
        return { ...state, submitted: true };
      case "reset":
        return initialState;
      default:
        throw new Error("invalid action type");
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch({ type: "submit" });
  }
  function handleChange(e) {
    const { name, value } = e.target;
    dispatch({ type: name, payload: value });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter your email"
          value={state.email}
          name="email"
          onChange={handleChange}
        />
        <br />
        <input
          type="password"
          placeholder="Enter your password"
          onChange={handleChange}
          name="password"
          value={state.password}
        />
        <button type="submit">Submit</button>
        {state.error && <div>No details found</div>}

        {!state.error && state.submitted && (
          <div>
            <div>User Email: {state.email}</div>
            <div>User Password: {state.password}</div>
          </div>
        )}
      </form>
    </>
  );
}
