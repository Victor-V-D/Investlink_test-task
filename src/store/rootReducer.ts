import { combineReducers } from "@reduxjs/toolkit";
import { tasksReducer } from "../features/taskSlice";

export const rootReducer = combineReducers({
  tasks: tasksReducer,
});
