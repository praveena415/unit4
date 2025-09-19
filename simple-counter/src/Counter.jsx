import React from "react";
import { increment,decrement,reset } from "./counterSlice";
import { useSelector,useDispatch } from "react-redux";

export const Counter=()=>{

	let count = useSelector((state)=>state.counter.value);
	const dispatch = useDispatch()
	return(
		<>
		<h2>Counter using redux toolkit</h2>
		<h1>Count:{count}</h1>
		<button onClick={()=>dispatch(increment())}>Increment</button>
		<button onClick={()=>dispatch(decrement())} disabled={count==0}>Decrement</button><br/>
		<button onClick={()=>dispatch(reset())}>Reset</button>
		</>
	)
}