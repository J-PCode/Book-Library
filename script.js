// Book Class
class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
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
        read: 'checked'
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
      <td> <label class="switch">
      <input type="checkbox" value=true id="read">
      <span class="slider round"></span>
    </label></td>
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
    document.querySelector('#book-form').addEventListener('submit', (e) =>{
      // prevent actual submit
      e.preventDefault();


      // Get form values
      const title = document.querySelector('#title').value;
      const author = document.querySelector('#author').value;
      const pages = document.querySelector('#pages').value;
      const read = document.querySelector('#read').checked;

      // Instantiate book
      const book = new Book(title, author, pages, read);

      console.log(e, book)
    }) ;

    // Event: Remove a Book
