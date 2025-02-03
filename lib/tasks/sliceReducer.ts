import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum TaskStatus {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  description?: string;
  isOpen?: boolean;
};

export interface TasksState {
  tasks: Array<Task>;
}

const initialState: TasksState = {
  tasks: [],
};

const slice = createSlice({
  name: "tasksState",
  initialState,
  reducers: {
    addTask: (draft, action: PayloadAction<Task>) => {
      draft.tasks.push(action.payload);
    },
    updateTask: (draft, action: PayloadAction<Partial<Task>>) => {
      draft.tasks = draft.tasks.map((task) =>
        task.id === action.payload.id ? { ...task, status: action.payload.status ?? TaskStatus.TODO } : task
      );
    },
    removeTask: (draft, action: PayloadAction<{ id: string }>) => {
        draft.tasks = draft.tasks.filter((task) => task.id !== action.payload.id);
    },
    isOpen: (draft, action: PayloadAction<{ id: string }>) => {
        const task = draft.tasks.find((task) => task.id === action.payload.id);
        if (task) {
            task.isOpen = !task.isOpen;
        }
    }, 
    updateDescription: (draft, action: PayloadAction<{ id: string, description: string}>) => {
        const task = draft.tasks.find((task) => task.id === action.payload.id);
        if (task) {
            task.description = action.payload.description;
        }
    },
    },
});

export const { actions } = slice;

export default slice.reducer;
