import { combineReducers, configureStore } from '@reduxjs/toolkit';
import taskReducer from './tasks/sliceReducer';

export const makeStore = () => {
  return configureStore({
    reducer: combineReducers({
        tasksState: taskReducer
    }),
    devTools: true
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
