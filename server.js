const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

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

app.use(express.json());
app.use(cors());

// Enhanced CORS configuration
const allowedOrigins = ['http://localhost:5000', 'http://localhost:3000','http://localhost:5173']; // Update with your client's origin
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Add allowed headers
    optionsSuccessStatus: 200, // Some legacy browsers choke on 204
  })
);



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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
