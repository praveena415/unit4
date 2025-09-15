import React from "react";
import { useReducer } from "react";

export default function CounterApp() {
  const [tstate, tdispatch] = useReducer(updateCounter, { count: 0 });
  function updateCounter(tstate, action) {
    switch (action.type) {
      case "Increment":
        return { count: tstate.count + 1 };
      case "Decrement":
        return { count: tstate.count - 1 };
      default:
        return tstate;
    }
  }
  return (
    <>
      <h2>Counter APP with useReducer</h2>
      <h1>Counter:{tstate.count}</h1>
      <button onClick={() => tdispatch({ type: "Increment" })}>
        Increment
      </button>
      <button
        disabled={tstate.count === 0}
        onClick={() => tdispatch({ type: "Decrement" })}
      >
        Decrement
      </button>
    </>
  );
}
