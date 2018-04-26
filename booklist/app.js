// Book constructor
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI(){
}

UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');

  // tr element
  const row = document.createElement('tr');
  // insert data
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete"></a>X</td>
  `
  list.appendChild(row);
}

// clear fields
UI.prototype.clearFields = function (){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// Event Listeners
document.getElementById('book-form').addEventListener('submit', function(ev){
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  // instantiate book
  const book = new Book(title, author, isbn);

  // instantiate ui object
  const ui = new UI();

  // Add book to list
  ui.addBookToList(book);
  ui.clearFields();
  ev.preventDefault();
});