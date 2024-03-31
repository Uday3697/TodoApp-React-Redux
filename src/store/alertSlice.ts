import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AlertState {
  message: string;
  type: 'success' | 'error';
}

const initialState: AlertState[] = [];

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<AlertState>) => {
      state.push(action.payload);
    },
    clearAlert: (state) => {
      return [];
    },
  },
});

export const { setAlert, clearAlert } = alertSlice.actions;

export default alertSlice.reducer;
