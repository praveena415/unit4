import React from "react";
import {useSelector,useDispatch} from "react-redux"
import { logout } from "../Context_slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CreateProject from "../Components/CreateProject";


export default function Admin(){

	let dispatch = useDispatch();
	let navigate = useNavigate()
	let user = useSelector((state)=>state.auth.user);
	if (!user) {
    return <p>Loading user data or unauthorized...</p>;
  }
  function handleLog(){
	dispatch(logout())
	 navigate("/login")
  }
  useEffect(()=>{
	if(!user){
		navigate("/login")
	}
  },[user])

	return(
		<>
		<h2>Admin</h2>
		<p>{user.email},{user.role}</p>
		<CreateProject/>
		<button onClick={handleLog}>Logout</button>
		</>
	)
}