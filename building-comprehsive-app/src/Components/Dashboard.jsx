import React from "react";

import { auth } from "../JS_Files/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  let navigate = useNavigate();
  console.log(auth.currentUser);
  async function handleSignout() {
    await signOut(auth);
    navigate("/login");
  }
  return (
    <>
      <h1>Welcome to dashboard</h1>
      <button onClick={handleSignout}>SignOut</button>
    </>
  );
}
