import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import FormData from "./FormData";

function App() {
  return (
    <>
      <h3>Displaying form data using useRef</h3>
      <FormData />
    </>
  );
}

export default App;
