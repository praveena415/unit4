import React from "react";
import { useReducer } from "react";

export default function Visibility() {
  const [visible, toggleVisible] = useReducer(display, { isVisible: false });
  function display(visible, action) {
    switch (action.type) {
      case "TRUE":
        return { isVisible: true };
      case "FALSE":
        return { isVisible: false };
      default:
        return visible;
    }
  }
  return (
    <>
      <h1>Toggling Message using Reducer</h1>

      <h5 style={{ display: visible.isVisible ? "block" : "none" }}>
        Hey, I am Praveena here!
      </h5>
      {!visible.isVisible ? (
        <button onClick={() => toggleVisible({ type: "TRUE" })}>
          {" "}
          Toggle Message
        </button>
      ) : (
        <button onClick={() => toggleVisible({ type: "FALSE" })}>
          Hide Message
        </button>
      )}
    </>
  );
}
