const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: String,
    author: [String],
    year: Number,
    pages: Number,
    ISBN: String,
    coverImageUrl: String,
    amazonLink: String,
    voteCount: Number,
    ratings: [Number],
    price: Number
})

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;