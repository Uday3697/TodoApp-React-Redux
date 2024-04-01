import React, { memo, useState, useEffect } from "react";
import { deleteTodo, toggleTodo } from "../store/todoSlice";
import { useAppDispatch } from "../store/types";
import "./TodoList.css"; // Import the CSS file
import { setAlert } from "../store/alertSlice";
import {
  useDeleteTodoMutation,
  useGetTodosQuery,
  useUpdateTodoMutation,
} from "../apiCalls/todoApi";
import { LinearGradient } from "react-text-gradients";

interface TodoListProps {
  showTasks: boolean; // Define showTasks as a prop
}

const TodoList: React.FC<TodoListProps> = ({ showTasks }) => {
  const dispatch = useAppDispatch();
  const { data: todos, refetch } = useGetTodosQuery({});
  const [editId, setEditId] = useState<number | null>(null); // State to store the id of the todo being edited
  const [editText, setEditText] = useState<string>(""); // State to store the edited text

  const [deleteTodoMutation] = useDeleteTodoMutation();

  const [updateTodoMutation] = useUpdateTodoMutation();

  useEffect(() => {
    // Update local store state when todos data changes from the backend
    if (todos) {
      dispatch({ type: "todo/setTodos", payload: todos });
    }
  }, [todos, dispatch]);

  const handleToggleTodo = (id: string) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      // Dispatch deleteTodo action to update local store state
      dispatch(deleteTodo(id));

      // Call deleteTodoMutation to delete the todo from the backend
      await deleteTodoMutation(id);

      dispatch(
        setAlert({ message: "Task deleted successfully", type: "success" })
      );
      // Refetch todos after deletion
      refetch();
    } catch (error) {
      console.error("Error deleting todo:", error);
      dispatch(setAlert({ message: "Error deleting task", type: "error" }));
    }
  };
  const handleEditClick = (id: number, text: string) => {
    setEditId(id); // Set the id of the todo being edited
    setEditText(text);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditText(e.target.value); // Update the edited text as the user types
  };

  const handleSaveEdit = async (id: string) => {
    try {
      // Call updateTodoMutation to update the todo in the backend
      await updateTodoMutation({ id, text: editText });
      setEditId(null); // Clear the edit state
      dispatch(
        setAlert({ message: "Task edited successfully", type: "success" })
      );
    } catch (error) {
      console.error("Error editing todo:", error);
      dispatch(setAlert({ message: "Error editing task", type: "error" }));
    }
  };

  return showTasks && todos ? (
    <div className="card-container">
      {todos.map((todo: any) => (
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
            onChange={() => handleToggleTodo(todo._id)}
          />
          <LinearGradient gradient={["to left", "#18acff ,#ff88f9"]}>
            Mark as Complited
          </LinearGradient>
          <button
            style={{ marginLeft: 10 }}
            onClick={() => handleDeleteTodo(todo._id)}
          >
            {" "}
            <LinearGradient gradient={["to left", "#17acff ,#ff68f0"]}>
              Delete
            </LinearGradient>
          </button>

          <button
            style={{ marginLeft: 10 }}
            onClick={() => handleEditClick(todo._id, todo.text)}
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
