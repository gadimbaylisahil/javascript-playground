// Book constructor
function Book(title, author, isbn){
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor
function UI(){
}
// listener for add book
UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');

  // tr element
  const row = document.createElement('tr');
  // insert data
  row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class='delete'>X</a></td>
  `;
  list.appendChild(row);
}

// delete book
UI.prototype.deleteBook = function(target){
  if(target.className == 'delete'){
    target.parentElement.parentElement.remove();
    const ui = new UI();
    ui.showAlert('Book has been deleted', 'success');
  }
}

// clear fields
UI.prototype.clearFields = function (){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
};

UI.prototype.showAlert = function(msg, className){
  const div = document.createElement('div');
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(msg));
  const container = document.querySelector('.container');
  const form = document.querySelector('#book-form');

  // insert div before form
  container.insertBefore(div, form);
  setTimeout(function () {
      document.querySelector('.alert').remove();
  }, 3000)
};

// Event Listeners
document.getElementById('book-form').addEventListener('submit', function(ev){
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;

  // instantiate book
  const book = new Book(title, author, isbn);

  // instantiate ui object
  const ui = new UI();

  if(title === '' || author === '' || isbn === ''){
    ui.showAlert('Please fill in all fields', 'error');
  } else {
    // Add book to list
    ui.addBookToList(book);
    ui.showAlert('Book has been added', 'success');
    ui.clearFields();
  }
  ev.preventDefault();
});

// Event listener for delete
document.getElementById('book-list').addEventListener('click', function(e) {
  const ui = new UI();
  ui.deleteBook(e.target);
  e.preventDefault();
});