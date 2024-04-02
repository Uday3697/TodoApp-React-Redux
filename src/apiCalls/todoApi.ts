import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://todoapp-react-redux.onrender.com/' }), // Update the baseUrl
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: () => 'todos',
    }),
    addTodo: builder.mutation({
      query: (text) => ({
        url: 'todos',
        method: 'POST',
        body: { text },
      }),
    }),
    updateTodo: builder.mutation({
        query: ({ id, text, completed }) => ({
          url: `todos/${id}`,
          method: 'PUT',
          body: { text, completed },
        }),
      }),
    deleteTodo:builder.mutation({
        query:(id)=>({
            url:`todos/${id}`,
            method:'DELETE'
        })
    }),
    
  }),
});

export const { useGetTodosQuery, useAddTodoMutation,useDeleteTodoMutation,useUpdateTodoMutation } = todoApi;
