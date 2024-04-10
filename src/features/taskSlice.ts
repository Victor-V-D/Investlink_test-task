import { persistReducer } from 'redux-persist';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { ITask } from "../interfaces/ITask";

interface State {
  error: Error | null;
  tasks: ITask[];
  categories: string[];
}

const initialState: State = {
  tasks: [],
  error: null,
  categories: ["Мои задачи", "Важные", "Выполненные", "Удалённые"],
};

export const directoryTags = ["Продуктивность", "Образование", "Здоровье", "Срочно"];

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const storedTasks = localStorage.getItem('tasks');

  if (storedTasks) {
    return JSON.parse(storedTasks);
  } else {
    return [];
  }
});

export const createTask = createAsyncThunk("tasks/createTask", async (newTask: ITask) => {
  const storedTasks = localStorage.getItem('tasks');
  let tasks: ITask[] = [];

  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }

  const taskWithStatus: ITask = { ...newTask, status: false, important: false };
  tasks.push(taskWithStatus);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  return tasks;
});

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (id: string) => {
  const storedTasks = localStorage.getItem('tasks');
  let tasks: ITask[] = [];

  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
  tasks = tasks.filter(task => task.id !== id);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  return tasks;
});

export const updateTaskStatus = createAsyncThunk("tasks/updateTaskStatus", async ({ id, status }: { id: string, status: boolean }) => {
  console.log("start");

  const storedTasks = localStorage.getItem('tasks');
  let tasks: ITask[] = [];

  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }

  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex !== -1) {
    tasks[taskIndex].status = status;
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

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
        state.error = null;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.error = action.error as Error;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = action.payload;
      });
  },
});

export const selectCategories = (state: State) => state.categories;

export const tasksReducer = tasksSlice.reducer;

const persistConfig = {
  key: 'tasks',
  storage: storage,
}

export const persistedReducer = persistReducer(persistConfig, tasksReducer);