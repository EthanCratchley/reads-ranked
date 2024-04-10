document.getElementById('search-form').addEventListener('submit', async function(e) {
    e.preventDefault(); // Prevent the default form submission
    const query = document.querySelector('.search-input').value;
    
    // Fetch the books from the backend
    const response = await fetch(`/api/search?q=${query}`);
    const books = await response.json();
    
    // Select the book list container
    const bookList = document.querySelector('.book-list');
    bookList.innerHTML = ''; // Clear current books
    
    // Iterate over the books and append them to the book list
    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');
        bookElement.innerHTML = `
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <p>${book.year}</p>
            <p>${book.pages}</p>
            <p>${book.ISBN}</p>
        `;
        bookList.appendChild(bookElement);
    });
});

