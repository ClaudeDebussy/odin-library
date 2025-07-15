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
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 543, true);
addBookToLibrary("12th Night", "William Shakespeare", 221, false);
console.log(myLibrary);

const container = document.querySelector("#container");

myLibrary.forEach(book => {
  const card = document.createElement("div");  
  card.classList.add("card");

  const title = document.createElement("h3");
  title.classList.add("title");
  title.textContent = book.title;

  const author = document.createElement("p");
  author.classList.add("author");
  author.textContent = book.author;

  const pages = document.createElement("p");
  pages.classList.add("pages");
  pages.textContent = book.pages;

  const isRead = document.createElement("p");
  isRead.classList.add("isRead");
  isRead.textContent = book.isRead;

  container.appendChild(card);
  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(isRead);


});