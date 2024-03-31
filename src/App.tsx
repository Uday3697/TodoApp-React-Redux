// src/App.tsx

import React from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { LinearGradient } from "react-text-gradients";

const App: React.FC = () => {
  return (
    <div>
      <h1>
        <LinearGradient gradient={["to left", "#17acff ,#ff68f0"]}>
          To Do App React & Redux
        </LinearGradient>
      </h1>
      <TodoInput />
      <TodoList />
    </div>
  );
};

export default App;
