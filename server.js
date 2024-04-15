// Importing Modules 
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Book = require('./bookModel');
const axios = require('axios');

// Initializing Express App and Connecting to MongoDB
const app = express();
const port = 3001;

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware Setup   
app.use(bodyParser.json());
app.use(express.static('public'));

// Search books using Google Books API
app.get('/search/books', async (req, res) => {
    const query = req.query.q; // Extract the search query from the request query parameters
    if (!query) {
        return res.status(400).json({ message: 'Search query is required.' }); // Validate query presence
    }

    try {
        // Make a GET request to Google Books API with the search query
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.GOOGLE_BOOKS_API_KEY}`);
        // Send the array of books in the response or an empty array if none
        res.json(response.data.items || []);
    } catch (error) {
        console.error('Error fetching books from Google Books API:', error);
        // Respond with a server error status code and message
        res.status(500).json({ message: 'Failed to fetch books from Google Books' });
    }
});

// Start the Server
app.listen(port, () => {
    console.log(`Server Running at http://localhost:${port}`);
});

