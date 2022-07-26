// Book Class
class Book {
  constructor(title, author, read, pages) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.pages = pages;
  }
}

// Class: Show UI tasks
class UI {
  static displayBooks() {
    const books = Store.getBooks();
    
    books.forEach((book) => UI.addBookToList(book));
  }
  
    static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td>
      <td>${book.read}</td>     
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
      list.appendChild(row);
    }
  static deleteBook(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
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
}

//EVENTS START HERE

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
e.preventDefault();

// get form values
const title = document.querySelector('#title').value;
const author = document.querySelector('#author').value;
const read = document.querySelector('#read').value;
const pages = document.querySelector('#pages').value;
  
   // Validate
  if(title === '' || author === '' || pages === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instatiate book
    const book = new Book(title, author, read, pages);

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
  // Remove book from UI
  UI.deleteBook(e.target);

  // Remove book from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  UI.showAlert('Book Removed', 'success');
});
