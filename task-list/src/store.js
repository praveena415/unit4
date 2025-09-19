import {configureStore} from "@reduxjs/toolkit";
import TaskReducer from "./taskSlice"

export const store= configureStore({
	reducer:{
		Task:TaskReducer,
	}
})