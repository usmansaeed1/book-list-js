// Book Class: Represents a Book
class Book {
  constructor(title, author, email, phone, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.email = email;
    this.phone = phone;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayBooks(list) {
    const books = list ? list : Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.email}</td>
      <td>${book.phone}</td>
      <td>${book.isbn}</td>
      
      <td>
        <a href="#" class="btn btn-danger btn-sm delete">X</a>
        <a href="#" id="${book.isbn}" class="btn btn-transparent btn-sm edit"><img src="pencil.svg" alt="Edit"/></a>
      </td>
    `;

    list.appendChild(row);
  }

  static clearBooks() {
     document.querySelector('#book-list').innerHTML = '';
  }

  static deleteBook(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static editBook(isbn) {
    console.log('editting book with isbn: ', isbn);

    const books = Store.getBooks();
    let book = null;

    books.forEach((b, index) => {
      if(b.isbn === isbn) {
        book = b;
      }
    });

     document.querySelector('#title').value = book.title;
      document.querySelector('#author').value = book.author;
    
    
    document.querySelector('#isbn').value = book.isbn;
    document.querySelector('#authorEmail').value = book.email;
    document.querySelector('#author-phone').value = book.phone;

    document.querySelector('.btn-block').value = 'Update';
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
    document.querySelector('#authorEmail').value = '';
    document.querySelector('#author-phone').value = '';
  }

  static show_error_text(fieldClass) {
    document.querySelector(fieldClass).style.display = 'block';
  }
}

// Store Class: Handles Storage
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if(book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }

  static UpdateBook(book) {
    const books = Store.getBooks();

    books.forEach((b, index) => {
      if(b.isbn === book.isbn) {
        b.title = book.title;
        b.author = book.author;
        b.email = book.email;
        b.phone = book.phone;

      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }

  static searchBook(query) {
    const books = Store.getBooks();
    let result = [];

    books.forEach((book) => {
      if(book.title.includes(query)) {
        result.push(book);
      }
    });

    return result;
  }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', () => UI.displayBooks());

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;
  const email = document.querySelector('#authorEmail').value;
  const phone = document.querySelector('#author-phone').value;

  // Validate
  if (title === '') {
    UI.show_error_text('.titleError');
  }
  if (author === '') {
    UI.show_error_text('.authorError');
  }
  if (isbn === '') {
    UI.show_error_text('.isbnError');
  }
  if (email === '') {
    UI.show_error_text('.emailError');
  }
  if (phone === '') {
    UI.show_error_text('.phoneError');
  }

  if(title === '' || author === '' || isbn === '' || email === '') {
    return;
  } else {
    // Check if the form is in update mode
    if (document.querySelector('.btn-block').value === 'Update') {
      const books = Store.getBooks();
      let book = null;

      books.forEach((b, index) => {
        if(b.isbn === isbn) {
          book = b;
        }
      });

      book.title = title;
      book.author = author;
      book.isbn = isbn;
      book.email = email;
      book.phone = phone;

      // Update book to store
      Store.UpdateBook(book);

      // Update book to UI
      UI.clearBooks();
      UI.displayBooks();

      // Show success message
      UI.showAlert('Book Updated', 'success');

      // Clear fields
      UI.clearFields();

      document.querySelector('.btn-block').value = 'Add Book';
      return;  
    }
    
    // Instatiate book
    const book = new Book(title, author, email, phone, isbn);

    // Add Book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    // Show success message
    UI.showAlert('Book Added', 'success');

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) => {
  if (e.target.parentElement.className.includes('edit')) {
    console.log('Edit clicked');

    UI.editBook(e.target.parentElement.id);
    return;
  }
  // Remove book from UI
  UI.deleteBook(e.target);

  // Remove book from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  UI.showAlert('Book Removed', 'success');
});