import { persistReducer } from 'redux-persist';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { ITask } from "../interfaces/ITask";

interface State {
  error: Error | null;
  loading: boolean;
  tasks: ITask[];
}

const initialState: State = {
  tasks: [],
  error: null,
  loading: false,
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const storedTasks = localStorage.getItem('tasks');

  if (storedTasks) {
    return JSON.parse(storedTasks);
  } else {
    return [];
  }
});

export const createTask = createAsyncThunk("tasks/createTask", async (task: ITask) => {
  const storedTasks = localStorage.getItem('tasks');
  let tasks: ITask[] = [];

  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  return tasks;
});

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id: number) => {
  const storedTasks = localStorage.getItem('tasks');
  let tasks: ITask[] = [];

  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
  tasks = tasks.filter(task => task.id !== id);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  return tasks;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.error = action.error as Error;
        state.loading = false;
      })
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = action.payload;
      });
  },
});

export const tasksReducer = tasksSlice.reducer;

const persistConfig = {
  key: 'tasks',
  storage: storage,
}

export const persistedReducer = persistReducer(persistConfig, tasksReducer);