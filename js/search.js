document.querySelector('.searchBtn').addEventListener('click', (e) => {
    console.log('searching');
    const query = document.querySelector('#search-input').value;
    const result = Store.searchBook(query);
    UI.clearBooks();
    UI.displayBooks(result); 
  });

  document.querySelector('.searchBtn').addEventListener('click', (e) => {
    console.log('searching');
    const query = document.querySelector('#search-input').value;
    const result = Store.searchBook(query);
    UI.clearBooks();
    UI.displayBooks(result); 
  });

document.getElementById('book-form').addEventListener('submit', function (e) {
    e.preventDefault();
    // Clear form fields after submission
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
});

function generateRandomAlphabeticString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }

    return result;
}

document.getElementById('addMockBooks').addEventListener('click', function () {
    // Call a function to add 1000 mock books
    addMockBooks();
});


function addMockBooks() {

    let books = [];

    for (let i = 1; i <= 1000; i++) {
        // Generate unique titles, authors, and ISBNs for mock books

        let randomIsbn = Math.floor(Math.random() * 1000000000000);
        // Generate a random string to add to the title and author to make them unique

        let randomTitle = generateRandomAlphabeticString(13);
        let randomAuthor = generateRandomAlphabeticString(13);
        let randomEmail = generateRandomAlphabeticString(13);

        // store the random title, author, and isbn in variables
        let title = randomTitle;
        let author = randomAuthor;
        let isbn = randomIsbn.toString();
        let email = randomEmail;

        const book = new Book(title, author, isbn, email, randomIsbn.toString());
        UI.addBookToList(book);
        Store.addBook(book);
        UI.clearBooks();
        UI.displayBooks();
    }
    UI.showAlert('1000 Books Added', 'success');
}