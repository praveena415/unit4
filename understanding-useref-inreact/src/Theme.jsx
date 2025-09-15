import React from "react";
import { useReducer } from "react";

export default function Theme() {
  function themereducer(state, action) {
    switch (action.type) {
      case "light":
        return { currtheme: "light" };
      case "dark":
        return { currtheme: "dark" };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(themereducer, { currtheme: "light" });

  return (
    <>
      <div
        style={{
          border: "2px solid",
          width: "90%",
          margin: "auto",
          height: "100vh",
          backgroundColor: state.currtheme == "light" ? "white" : "grey",
          color: state.currtheme == "light" ? "black" : "white",
        }}
      >
        <h3>Toggle theme with useReducer</h3>
        <h1>Current Theme: {state.currtheme}</h1>
        {state.currtheme === "light" ? (
          <button onClick={() => dispatch({ type: "dark" })}>
            Switch to Dark
          </button>
        ) : (
          <button onClick={() => dispatch({ type: "light" })}>
            Switch to Light
          </button>
        )}
      </div>
    </>
  );
}
