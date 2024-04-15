document.getElementById('search-form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevent the default form submission
    const query = document.querySelector('.search-input').value;

    // Fetch the books from the backend using the correct endpoint
    const response = await fetch(`/search/books?q=${encodeURIComponent(query)}`);

    if (!response.ok) {
        console.error(`HTTP error! status: ${response.status}`);
        return; // Exit the function if there was an error
    }

    const data = await response.json();
    console.log("Received data:", data); // See what data looks like in the console
    const books = data.items || []; // Make sure to access the items property

    // Select the book list container
    const bookList = document.querySelector('.book-list');
    bookList.innerHTML = ''; // Clear current books

    // Iterate over the books and append them to the book list
    books.forEach(book => {
        const bookElement = document.createElement('div');
        bookElement.classList.add('book');
        const bookInfo = book.volumeInfo; // Google Books API specific structure

        // Use optional chaining and default values to avoid errors when data is missing
        bookElement.innerHTML = `
            <h3>${bookInfo.title || 'No title available'}</h3>
            <p>${bookInfo.authors ? bookInfo.authors.join(', ') : 'No authors'}</p>
            <p>${bookInfo.publishedDate || 'No publication date'}</p>
            <p>${bookInfo.pageCount || 'No page count'}</p>
            <p>${bookInfo.industryIdentifiers ? bookInfo.industryIdentifiers.map(identifier => identifier.identifier).join(', ') : 'No ISBN'}</p>
        `;
        bookList.appendChild(bookElement);
    });
});