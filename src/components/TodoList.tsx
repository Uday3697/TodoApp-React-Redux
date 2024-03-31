// src/components/TodoList.tsx

import React from "react";
import { deleteTodo, toggleTodo } from "../store/todoSlice";
import { useAppDispatch, useAppSelector } from "../store/types";
import "./TodoList.css"; // Import the CSS file
import { LinearGradient } from "react-text-gradients";

const TodoList: React.FC = () => {
  const todos = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      {todos.map((todo) => (
        <div className="todoCard" key={todo.id}>
            <div className="sub-con">
         
          <span
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.text}
          </span>
          </div>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleToggleTodo(todo.id)}
          />
          <button onClick={() => handleDeleteTodo(todo.id)}>
            {" "}
            <LinearGradient gradient={["to left", "#17acff ,#ff68f0"]}>
              Delete
            </LinearGradient>
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
