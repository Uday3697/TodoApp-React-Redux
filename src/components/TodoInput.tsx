import React, { useState } from "react";
import { addTodo } from "../store/todoSlice";
import { useAppDispatch } from "../store/types";
import TodoList from "./TodoList"; // Import the TodoList component
import "./TodoInput.css";
import { setAlert } from "../store/alertSlice";
const TodoInput: React.FC = () => {
  const [text, setText] = useState("");
  const [showTasks, setShowTasks] = useState(false); // State to toggle showing tasks
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() !== "") {
      dispatch(addTodo(text));
      dispatch(setAlert({ message: 'Task added successfully', type: 'success' }));
      setText('');
    } else {
      dispatch(setAlert({ message: 'Please enter a valid task', type: 'error' }));
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
            style={{
              minHeight: 100,
              width: "80%",
              padding: 8,
              borderRadius: 8,
              border: 0,
            }}
          />
          <div style={{ display: "flex", gap: 20, marginTop: 30 }}>
            <button type="submit">Add Task</button>
            <button onClick={() => setShowTasks(!showTasks)}>Show Tasks</button>
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
