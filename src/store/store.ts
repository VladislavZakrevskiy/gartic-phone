//@ts-nocheck
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import toolSlice from './reducers/toolSlice';
import canvasSlice from './reducers/canvasSlice';
import userSlice from './reducers/UserSlice';
import modesSlice from './reducers/modesSlice';
import { getApi } from './API/getAPI';

const reducers = combineReducers({
    toolSlice,
    canvasSlice,
    userSlice,
    modesSlice,
    [getApi.reducerPath]: getApi.reducer
})

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([getApi.middleware]),

});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch