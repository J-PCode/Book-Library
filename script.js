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

// Store Class: Handles Storage

// Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
e.preventDefault();

// get form values
const title = document.querySelector('#title').value;
const author = document.querySelector('#author').value;
const read = document.querySelector('#read').value;
const pages = document.querySelector('#pages).value;

