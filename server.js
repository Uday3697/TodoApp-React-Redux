const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { error } = require('console');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());


// Connect to MongoDB database
// kidly use your db link here  
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define schema/model
const TodoSchema = new mongoose.Schema({
  text: String,
  completed: Boolean,
});
const Todo = mongoose.model('Todo', TodoSchema);

// user schema to submit form 
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  city: String,
});

const User = mongoose.model('User', UserSchema);



app.use(express.json());



// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new todo
app.post('/todos', async (req, res) => {
  const { text } = req.body;
  const newTodo = new Todo({
    text,
    completed: false,
  });
  try {
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a todo
app.put('/todos/:id', async (req, res) => {
  const id = req.params.id;
  const { text, completed } = req.body;
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { text, completed },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    res.json(deletedTodo);
  } catch (error) {
    res.status(404).json({ message: 'Todo not found' });
  }
});

// user form submit 
app.post('/users', async (req, res) => {
  const { name, email, phone, city } = req.body;
  const newUser = new User({
    name,
    email,
    phone,
    city,
  });
  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser)
  }catch{
    res.status(400).json({ message: error.message });

  }
})






app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
