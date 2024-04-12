import { persistReducer } from 'redux-persist';
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { ITask } from "../interfaces/ITask";
import { RootState } from '../store/store';

interface State {
  error: Error | null;
  tasks: ITask[];
  categories: string[];
  filteredTasks: ITask[];
}

export const directoryTags = ["Продуктивность", "Образование", "Здоровье", "Срочно"];
export const directoryCategory = ["Мои задачи", "Важные", "Выполненные", "Удалённые"];

const initialState: State = {
  tasks: [],
  error: null,
  categories: directoryCategory,
  filteredTasks: [],
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const storedTasks = localStorage.getItem('tasks');

  if (storedTasks) {
    return JSON.parse(storedTasks);
  } else {
    return [];
  }
});

export const createTask = createAsyncThunk("tasks/createTask",
  async (newTask: ITask) => {
    const storedTasks = localStorage.getItem('tasks');
    let tasks: ITask[] = [];

    if (storedTasks) {
      tasks = JSON.parse(storedTasks);
    }

    const taskWithStatus: ITask = { ...newTask, status: false };
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

export const updateTaskStatus = createAsyncThunk("tasks/updateTaskStatus",
  async ({ id, status }: { id: string, status: boolean }) => {
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

    return tasks[taskIndex];
  });

export const updateTaskCategory = createAsyncThunk(
  "tasks/updateTaskCategory",
  async ({ id, category }: { id: string, category: string }) => {
    const storedTasks = localStorage.getItem('tasks');
    let tasks: ITask[] = [];

    if (storedTasks) {
      tasks = JSON.parse(storedTasks);
    }

    const taskIndex = tasks.findIndex(task => task.id === id);

    if (taskIndex !== -1) {
      tasks[taskIndex].category = category;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    return tasks[taskIndex];
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    searchTasks: (state, action: PayloadAction<string>) => {
      const searchTerm = action.payload.toLowerCase();
      state.filteredTasks = state.tasks.filter(task => task.text.toLowerCase().includes(searchTerm));
    },
  },

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
      })
      .addCase(updateTaskCategory.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const existingTaskIndex = state.tasks.findIndex(task => task.id === updatedTask.id);
        if (existingTaskIndex !== -1) {
          state.tasks[existingTaskIndex] = updatedTask;
        }
      })
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const updatedTask = action.payload;
        const existingTaskIndex = state.tasks.findIndex(task => task.id === updatedTask.id);
        if (existingTaskIndex !== -1) {
          state.tasks[existingTaskIndex] = updatedTask;
        }
      });
  },
});

export const { searchTasks } = tasksSlice.actions;
export const selectFilteredTasks = (state: RootState) => state.tasks.tasks.filteredTasks;

export const selectCategories = (state: State) => state.categories;
export const tasksReducer = tasksSlice.reducer;

const persistConfig = {
  key: 'tasks',
  storage: storage,
}

export const persistedReducer = persistReducer(persistConfig, tasksReducer);