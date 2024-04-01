import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import alertReducer from './alertSlice'; // Import alert reducer
import { setupListeners } from '@reduxjs/toolkit/query';
import { todoApi } from '../apiCalls/todoApi';


const store = configureStore({
  reducer: {
    todo: todoReducer,
    alert: alertReducer, // Include alert reducer in the store
    [todoApi.reducerPath]: todoApi.reducer, // RTK-Query API calling  reducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(todoApi.middleware),  //RTK-Query middleware
});

setupListeners(store.dispatch); // Set up listeners for RTK-Query

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
