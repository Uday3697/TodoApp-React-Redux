const express = require('express');
const cors = require('cors'); // For enabling CORS
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors()); // Enable CORS for development purposes

let todos = []; // Array to store todos

// Get all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post('/todos', (req, res) => {
  const { text } = req.body;
  const newTodo = { id: todos.length + 1, text, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update a todo
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { text, completed } = req.body;
  const todoIndex = todos.findIndex(todo => todo.id === id);
  if (todoIndex !== -1) {
    todos[todoIndex] = { ...todos[todoIndex], text, completed };
    res.json(todos[todoIndex]);
  } else {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// Delete a todo
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const deletedTodo = todos.find(todo => todo.id === id);
  todos = todos.filter(todo => todo.id !== id);
  res.json(deletedTodo);
});




app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
