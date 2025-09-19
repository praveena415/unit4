import {createSlice} from "@reduxjs/toolkit"
import React from "react"
const TaskSlice = createSlice({
	name:"Task",
	initialState:{value:[]},
	reducers:{
		addTask:(state,action)=>{
			state.value.push(action.payload);
		},
		deleteTask:(state,action)=>{
			state.value=state.value.filter((task)=>task.id!==action.payload);
		},
		toggleTask:(state,action)=>{
			 const task = state.value.find((item) => item.id === action.payload);
  if (task) {
    task.status = !task.status;
  }
		}
	}
	
})

export const {addTask,deleteTask,toggleTask} = TaskSlice.actions;
export default TaskSlice.reducer;