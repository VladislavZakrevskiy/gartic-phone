import { configureStore, combineReducers } from '@reduxjs/toolkit';
import toolSlice from './reducers/toolSlice';
import canvasSlice from './reducers/canvasSlice';
import userSlice from './reducers/UserSlice';
import modesSlice from './reducers/modesSlice';

const reducers = combineReducers({
    toolSlice,
    canvasSlice,
    userSlice,
    modesSlice
})

export const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch