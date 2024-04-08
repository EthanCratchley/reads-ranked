const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Book = require('./bookModel');

mongoose.connect('URI', { useNewUrlParser: true, useUnifiedTopology: true});

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

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.listen(port, () => {
    console.log('Server Running at http://localhost:${port}');
});

async function fetchBooks() {
    const response = await fetch('/api/books');
    const books = await response.json();
}

fetchBooks();

