import React from "react";

import { Link, useNavigate } from "react-router-dom";
export default function Navbar() {
  return (
    <>
      <Link to="/">Home</Link>
      <Link to="/login">Register/Sigh In</Link>
      <Link to="/dashboard">DashBoard</Link>
    </>
  );
}
