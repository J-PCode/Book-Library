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
     const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }

    static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');
    
    if(book.read === 'Read'){
      row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.pages}</td> 
      <td><a href="#" class="btn btn-read">${book.read}</a></td>
      <td><a href="#" class="btn delete fa-solid fa-trash-can"></a></td>
      `;
    }else{
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.pages}</td> 
    <td><a href="#" class="btn btn-unread">${book.read}</a></td>
    <td><a href="#" class="delete fa-solid fa-trash-can"></a></td>
    `;
  }
      console.log(list, row)
      list.appendChild(row);
      }

      static deleteBook(el){
        if(el.classList.contains('delete')){
          console.log(el.parentElement.parentElement)
          el.parentElement.parentElement.remove();
          UI.showAlert('Book Removed', 'success')
        }
      }
      static toggleRead(toggle){
        if(toggle.classList.contains('btn-read')){
        toggle.textContent = 'Not read';
        toggle.classList.remove('btn-read')
        toggle.classList.add('btn-unread')
        }else if(toggle.classList.contains('btn-unread')){
        toggle.textContent = 'Read';
        toggle.classList.remove('btn-unread')
        toggle.classList.add('btn-read')
        }
      }
      static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('.main');
        container.insertBefore(div, form);
        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
      }

      static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#pages').value = '';
        document.querySelector('#read').checked = false;
     }
  }
    // Store Class: Handles Storage

    class Store {
      static getBooks() {
        let books;
        if(localStorage.getItem('books') === null){
          books = [];
        } else{
          books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
      }
      static addBook(book){
        const books = Store.getBooks();

        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
      }

      static removeBook(title){
        const books = Store.getBooks();
        
        books.forEach((book, index) => {
          console.log(book.title, title)
          if(book.title === title) {
            books.splice(index, 1);
          }          
        });
        localStorage.setItem('books', JSON.stringify(books));
      }
    }
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
      const read = document.querySelector('#read').checked ? 'Read' : 'Not Read';
      
      // Validate
      if(title === '' || author === '' || pages === ''){
        UI.showAlert('Please  fill in all fields', 'danger');

      } else{
      // Instantiate book
      const book = new Book(title, author, pages, read);

      // Add book to UI
      UI.addBookToList(book);

      // Add book to store
      Store.addBook(book)

      // Show success message
      UI.showAlert('Book Added', 'success');

      //Clear fields
      UI.clearFields();
      }
    }) ;

    // Event: Remove a Book
    document.querySelector('#book-list').addEventListener('click', (e) => {
      
      // Remove book from UI
      UI.deleteBook(e.target);

      // Remove book from store
      
      Store.removeBook(e.target.parentElement.parentElement.firstElementChild.textContent);
      // toggle read or not read
      UI.toggleRead(e.target);

    })
