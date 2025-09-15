import { useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  let inputRef = useRef(null);
  const [focused, setFocused] = useState(false);

  function focus() {
    inputRef.current.focus();
    inputRef.current.style.backgroundColor = "aqua";
    setFocused(true);
  }

  return (
    <>
      <h1>This is USEREF App</h1>
      <input type="text" ref={inputRef} placeholder="Enter some text here" />
      <button onClick={focus}>click me to focus on the input</button>
      {focused && (
        <p style={{ color: "#9ceb5bff", marginTop: "8px" }}>Focused!</p>
      )}
    </>
  );
}

export default App;
