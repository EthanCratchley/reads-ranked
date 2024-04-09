const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    coverImageUrl: String,
    amazonLink: String,
    ratings: [Number],
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;