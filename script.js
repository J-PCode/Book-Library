// Book Class
class Book {
  constructor(title, author, read, pages) {
    this.title = title;
    this.author = author;
    this.read = read;
    this.pages = pages;
  }
}

// UI Class: Show UI tasks: displaybooks, remove book, add book, 
class UI {
  static displayBooks() {
    const StoredBooks = [
      {
        title:'Book One',
        author: 'John Doe',
        pages: '210',
        read: ''
      },
      {
        title:'Book two',
        author: 'Jane Doe',
        pages: '310',
        read: ''
      }
    ];

    const books = StoredBooks;
    
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
      console.log(list, row)
      list.appendChild(row);
    }
  }
    // Store Class: Handles Storage

    // Event: Display Books
    document.addEventListener('DOMContentLoaded', UI.displayBooks);

    // Event : Add a book

    // Event: Remove a Book