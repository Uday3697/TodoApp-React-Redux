import React, { useState } from "react";
import { useAppDispatch } from "../store/types";
import TodoList from "./TodoList";
import "./TodoInput.css";
import { setAlert } from "../store/alertSlice";
import { useAddTodoMutation, useGetTodosQuery } from "../apiCalls/todoApi";
import { todo } from "node:test";

const TodoInput: React.FC = () => {
  const [text, setText] = useState("");
  const [showTasks, setShowTasks] = useState(false);
  const dispatch = useAppDispatch();

  const [addTodoMutation, { isLoading: isAddingTodo }] = useAddTodoMutation();
  const { data: todos, refetch } = useGetTodosQuery({});

  console.log("-------------------------tttt-todo", todos);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() !== "") {
      try {
        const { data: newTodo } = await addTodoMutation(text);

        setText("");
        dispatch(setAlert({ message: "Task added successfully", type: "success" }));
        refetch(); // Automatically refetch data after adding a new task
      } catch (error) {
        console.error("Error adding todo:", error);
        dispatch(setAlert({ message: "Error adding task", type: "error" }));
      }
    } else {
      dispatch(setAlert({ message: "Please enter a valid task", type: "error" }));
    }
  };

  const showTaskHandler = () => {
    setShowTasks(!showTasks);
    if (!showTasks) {
      refetch(); // Automatically refetch data when clicking the "Show Tasks" button
    }
  };

  return (
    <div className="home-con">
      <div className="leftside">
        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new task..."
            className="textInput"
          />
          <div style={{ display: "flex", gap: 20, marginTop: 30 }}>
            <button type="submit" disabled={isAddingTodo}>Add Task</button>
            <button onClick={showTaskHandler} disabled={isAddingTodo}>Show Tasks</button>
          </div>
        </form>
      </div>

      <div className="rightside">
        <TodoList showTasks={showTasks} />
      </div>
    </div>
  );
};

export default TodoInput;
