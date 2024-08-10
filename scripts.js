document.addEventListener('DOMContentLoaded', () => {
    const bookList = document.getElementById('bookList');
    const addBookForm = document.getElementById('addBookForm');
    const searchInput = document.getElementById('searchInput');

    let books = JSON.parse(localStorage.getItem('books')) || [];

    function renderBooks() {
        bookList.innerHTML = '';

        books.forEach((book, index) => {
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book');
            bookDiv.innerHTML = `
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Category: ${book.category}</p>
                <button onclick="deleteBook(${index})">Delete</button>
            `;
            bookList.appendChild(bookDiv);
        });
    }

    function addBook(e) {
        e.preventDefault();
        const title = document.getElementById('titleInput').value;
        const author = document.getElementById('authorInput').value;
        const category = document.getElementById('categoryInput').value;

        books.push({ title, author, category });
        localStorage.setItem('books', JSON.stringify(books));
        renderBooks();

        addBookForm.reset();
    }

    function searchBooks() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm)
        );
        
        bookList.innerHTML = '';

        filteredBooks.forEach((book, index) => {
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book');
            bookDiv.innerHTML = `
                <h3>${book.title}</h3>
                <p>Author: ${book.author}</p>
                <p>Category: ${book.category}</p>
                <button onclick="deleteBook(${index})">Delete</button>
            `;
            bookList.appendChild(bookDiv);
        });
    }

    window.deleteBook = function(index) {
        books.splice(index, 1);
        localStorage.setItem('books', JSON.stringify(books));
        renderBooks();
    }

    addBookForm.addEventListener('submit', addBook);
    searchInput.addEventListener('input', searchBooks);

    renderBooks();
});
