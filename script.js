const myLibrary = [];

// Book constructor
function Book(title, author, pages, isRead) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = crypto.randomUUID();

}

function addBookToLibrary(title, author, pages, isRead) {
  myLibrary.push(new Book(title, author, pages, isRead));
}

addBookToLibrary("Harry Potter", "J.K. Rowling", 420, true);
console.log(myLibrary);
console.log(crypto.randomUUID())