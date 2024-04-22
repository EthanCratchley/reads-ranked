document.getElementById('search-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    const query = document.querySelector('.search-input').value;

    try {
        const response = await fetch(`/search/books?q=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        let data;
        try {
            data = await response.json();
        } catch (error) {
            throw new Error('Error parsing JSON:', error);
        }
        console.log('Received data:', data);
        const books = data.items || [];
        
        const bookList = document.querySelector('.book-list');
        bookList.innerHTML = ''; // Clear the current list
        
        books.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.classList.add('book');
            const bookInfo = book.volumeInfo;
            
            bookElement.innerHTML = `
                <h3>${bookInfo.title || 'No title available'}</h3>
                <p>${bookInfo.authors ? bookInfo.authors.join(', ') : 'No authors'}</p>
                <p>${bookInfo.publishedDate || 'No publication date'}</p>
                <p>${bookInfo.pageCount || 'No page count'} pages</p>
                <p>${bookInfo.industryIdentifiers ? bookInfo.industryIdentifiers.map(identifier => identifier.identifier).join(', ') : 'No ISBN'}</p>
            `;
            bookList.appendChild(bookElement);
        });
        console.log(bookList.innerHTML);
    } catch (error) {
        console.error('Error fetching search results:', error);
    }
});
