import React from "react";

import { useSelector, useDispatch } from "react-redux";

export default function Userb() {
  let dispatch = useDispatch();
  let user = useSelector((state) => state.auth.user);

  return (
    <>
      <h2>Admin</h2>
      <p>
        {user.email},{user.role}
      </p>
    </>
  );
}
