// Importing necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize Express
const app = express();

// Middleware to parse JSON data
app.use(bodyParser.json());

// MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://mehardeepk38:JzlByvi3SPJJQKNj@cluster0.afkg8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB Atlas
mongoose
  .connect(mongoURI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Create a schema for a simple item (like a todo item)
const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

// Create a model for the schema
const Item = mongoose.model('Item', ItemSchema);

// CREATE: Add a new item
app.post('/api/items', async (req, res) => {
  const { name, description } = req.body;

  // Validate inputs
  if (!name || !description) {
    return res.status(400).json({ msg: 'Please include both name and description'});
  }

  // Create a new item
  const newItem = new Item({
    name,
    description
  });

  try {
    const item = await newItem.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ msg: 'Error creating item', error: err });
  }
});

// READ: Get all items
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.findAll();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching items', error: err });
  }
});

// READ: Get an item by ID
app.get('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Item not found' });

    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching item', error: err });
  }
});

// UPDATE: Update an item by ID
app.put('/api/items/:id', async (req, res) => {
  const { name, description } = req.body;

  // Validate inputs
  if (!name || !description) {
    return res.status(400).json({ msg: 'Please include both name and description' });
  }

  try {
    let item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Item not found' });

    // Update item
    item.name = name;
    item.description = description;

    await item.save();
    res.status(200).json(item);
  } catch (err) {
    res.status(500).json({ msg: 'Error updating item', error: err });
  }
});

// DELETE: Remove an item by ID
app.delete('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: 'Item not found' });

    await item.deleteOne();
    res.status(200).json({ msg: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Error deleting item', error: err });
  }
});

// Server listening on port 8080
const PORT = process.env.PORT || 5500;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));