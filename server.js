// Importing Modules 
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Book = require('./bookModel');
const axios = require('axios');

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
    try{
        const books = await Book.find({});
        res.json(books);
    } catch (erro) {
        console.error('Failed to fetch books', error);
        res.status(500).json({message: 'Failed to fetch books'});
    }
});

// Add a new book
app.post('/api/books', async (req, res) => {
    try {
        const newBook = new Book(req.body);
        const savedBook = await newBook.save();
        res.json(savedBook);
    } catch (error) {
        console.error('Failed to save book:', error);
        res.status(500).json({ message: 'Failed to save book' });
    }
});

// Search books using Google Books API
app.get('/search/books', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ message: 'Search query is required.' });
    }
  
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.GOOGLE_BOOKS_API_KEY}`);
        res.json(response.data.items || []);
    } catch (error) {
        console.error('Error fetching books from Google Books API:', error);
        res.status(500).json({ message: 'Failed to fetch books from Google Books' });
    }
});

// Start the Server
app.listen(port, () => {
    console.log(`Server Running at http://localhost:${port}`);
});

