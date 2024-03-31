import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import alertReducer from './alertSlice'; // Import alert reducer

const store = configureStore({
  reducer: {
    todo: todoReducer,
    alert: alertReducer, // Include alert reducer in the store
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
