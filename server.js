// Importing Modules 
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Book = require('./bookModel');

// Initializing Express App and Connecting to MongoDB
const app = express();
const port = 3000;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware Setup   
app.use(bodyParser.json());
app.use(express.static('public'));

// API Endpoints
// Get list of Books
app.get('/api/books', async (req, res) => {
    const books = await Book.find({});
    res.json(books);
});

// Add a new book
app.post('/api/books', async (req, res) => {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.json(savedBook);
});

// Start the Server
app.listen(port, () => {
    console.log(`Server Running at http://localhost:${port}`);
});

