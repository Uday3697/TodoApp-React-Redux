import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  _id: string;
  text: string;
  completed: boolean;
}

const initialState: Todo[] = [];

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: {
      reducer(state, action: PayloadAction<Todo>) {
        state.push(action.payload);
      },
      prepare(text: string) {
        return {
          payload: {
            text,
            completed: false,
          },
        };
      },
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.find((todo) => todo._id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    editTodo: (state, action: PayloadAction<{ _id: string; text: string }>) => {
      const todo = state.find((todo) => todo._id === action.payload._id);
      if (todo) {
        todo.text = action.payload.text;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      // Change the payload type to string for _id
      return state.filter((todo) => todo._id !== action.payload);
    },
  },
});

export const { addTodo, toggleTodo, editTodo, deleteTodo } = todoSlice.actions;

export default todoSlice.reducer;
