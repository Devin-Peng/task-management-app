import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

export type Task = {
    title: string;
    status: TaskStatus;
}

export interface TasksState {
    tasks: Array<Task>
}

const initialState: TasksState = {
    tasks: []
}

const slice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (draft, action: PayloadAction<Task>) => {
        draft.tasks.push(action.payload);
    },
    deleteTask: () => {}
  }
})

export const { actions } = slice;

export default slice.reducer;
