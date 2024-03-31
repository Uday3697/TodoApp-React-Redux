import React, { memo, useState } from "react";
import { deleteTodo, editTodo, toggleTodo } from "../store/todoSlice";
import { useAppDispatch, useAppSelector } from "../store/types";
import "./TodoList.css"; // Import the CSS file
import { LinearGradient } from "react-text-gradients";
import { setAlert } from "../store/alertSlice";
interface TodoListProps {
  showTasks: boolean; // Define showTasks as a prop
}
const TodoList: React.FC<TodoListProps> = ({ showTasks }) => {
  const todos = useAppSelector((state) => state.todo);
  const dispatch = useAppDispatch();
  const [editId, setEditId] = useState<number | null>(null); // State to store the id of the todo being edited
  const [editText, setEditText] = useState<string>(""); // State to store the edited text

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id: number) => {
    dispatch(deleteTodo(id));
    dispatch(
      setAlert({ message: "Task deleted successfully", type: "success" })
    );
  };

  const handleEditClick = (id: number, text: string) => {
    setEditId(id); // Set the id of the todo being edited
    setEditText(text);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditText(e.target.value); // Update the edited text as the user types
  };

  const handleSaveEdit = (id: number) => {
    dispatch(editTodo({ id, text: editText }));
    setEditId(null); // Clear the edit state
    dispatch(
      setAlert({ message: "Task edited successfully", type: "success" })
    );
  };

  return showTasks ? (
    <div className="card-container">
      {todos.map((todo) => (
        <div className="todoCard" key={todo.id}>
          <div className="sub-con">
            {editId === todo.id ? (
              <textarea
                value={editText}
                onChange={(e) => handleEditChange(e)}
                onBlur={() => handleSaveEdit(todo.id)} // Save changes on blur
                style={{ minHeight: "100%", minWidth: "100%" }}
              />
            ) : (
              <div
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  textOverflow: "ellipsis",
                  overflow: "scroll",
                }}
              >
                {todo.text}
              </div>
            )}
          </div>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleToggleTodo(todo.id)}
          />
          <LinearGradient gradient={["to left", "#18acff ,#ff88f9"]}>
            Mark as Complited
          </LinearGradient>
          <button
            style={{ marginLeft: 10 }}
            onClick={() => handleDeleteTodo(todo.id)}
          >
            {" "}
            <LinearGradient gradient={["to left", "#17acff ,#ff68f0"]}>
              Delete
            </LinearGradient>
          </button>

          <button
            style={{ marginLeft: 10 }}
            onClick={() => handleEditClick(todo.id, todo.text)}
          >
            <LinearGradient gradient={["to left", "#17acff ,#ff68f0"]}>
              Edit
            </LinearGradient>
          </button>
        </div>
      ))}
    </div>
  ) : (
    <></>
  );
};

export default memo(TodoList);
