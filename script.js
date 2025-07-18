let myLibrary = [];

const bookPrototype = {
  toggleRead() {
    this.isRead ? this.isRead = false : this.isRead = true;
    populateLibrary();
  }
}

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

Object.assign(Book.prototype, bookPrototype);

function addBookToLibrary({title, author, pages, isRead}) {
  myLibrary.push(new Book(title, author, pages, isRead));
}

addBookToLibrary({
  title: "Harry Potter",
  author: "J.K. Rowling",
  pages: 420,
  isRead: true
});

addBookToLibrary({
  title: "The Hobbit",
  author: "J.R.R. Tolkien",
  pages: 543,
  isRead: true
});

addBookToLibrary({
  title: "12th Night",
  author: "William Shakespeare",
  pages: 221,
  isRead: false
});

addBookToLibrary({
  title: "A Funny Thing Happened On The Way To The Forum",
  author: "Burt Shevelove and Larry Gelbart",
  pages: 124,
  isRead: false
});

const container = document.querySelector("#container");

function populateLibrary() {
  // Clear container
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
  
  myLibrary.forEach(book => {
  const card = document.createElement("div");  
  card.classList.add("card");

  const title = document.createElement("h3");
  title.classList.add("title");
  title.textContent = book.title;

  const author = document.createElement("p");
  author.classList.add("author");
  author.textContent = `By ${book.author}`;

  const pages = document.createElement("p");
  pages.classList.add("pages");
  pages.textContent = `${book.pages} pages`;

  const trashIcon = document.createElement("div");
  trashIcon.classList.add("trash");
  trashIcon.innerHTML = (`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M2.75 6.16667C2.75 5.70644 3.09538 5.33335 3.52143 5.33335L6.18567 5.3329C6.71502 5.31841 7.18202 4.95482 7.36214 4.41691C7.36688 4.40277 7.37232 4.38532 7.39185 4.32203L7.50665 3.94993C7.5769 3.72179 7.6381 3.52303 7.72375 3.34536C8.06209 2.64349 8.68808 2.1561 9.41147 2.03132C9.59457 1.99973 9.78848 1.99987 10.0111 2.00002H13.4891C13.7117 1.99987 13.9056 1.99973 14.0887 2.03132C14.8121 2.1561 15.4381 2.64349 15.7764 3.34536C15.8621 3.52303 15.9233 3.72179 15.9935 3.94993L16.1083 4.32203C16.1279 4.38532 16.1333 4.40277 16.138 4.41691C16.3182 4.95482 16.8778 5.31886 17.4071 5.33335H19.9786C20.4046 5.33335 20.75 5.70644 20.75 6.16667C20.75 6.62691 20.4046 7 19.9786 7H3.52143C3.09538 7 2.75 6.62691 2.75 6.16667Z" fill="#000000"></path> <path d="M11.6068 21.9998H12.3937C15.1012 21.9998 16.4549 21.9998 17.3351 21.1366C18.2153 20.2734 18.3054 18.8575 18.4855 16.0256L18.745 11.945C18.8427 10.4085 18.8916 9.6402 18.45 9.15335C18.0084 8.6665 17.2628 8.6665 15.7714 8.6665H8.22905C6.73771 8.6665 5.99204 8.6665 5.55047 9.15335C5.10891 9.6402 5.15777 10.4085 5.25549 11.945L5.515 16.0256C5.6951 18.8575 5.78515 20.2734 6.66534 21.1366C7.54553 21.9998 8.89927 21.9998 11.6068 21.9998Z" fill="#000000"></path> </g></svg>`);

  const readStatus = document.createElement("p");
  readStatus.classList.add("read-status");
  if (book.isRead === true) {
    readStatus.textContent = "Finished";
    readStatus.classList.add("finished");
  } else {
    readStatus.textContent = "Unread";
    readStatus.classList.add("unread")
  };

  card.dataset.uuid = book.id;

  container.appendChild(card);
  card.appendChild(title);
  card.appendChild(author);
  card.appendChild(pages);
  card.appendChild(trashIcon);
  card.appendChild(readStatus);
  });

  setupTrashListeners();
  setupToggleReadListeners();
}

let modal = document.querySelector("#newBookModal");
let newBookButton = document.querySelector("#newBookButton");
let closeNewBookButton = document.querySelector("#closeNewBookButton");

newBookButton.addEventListener("click", openNewBookModal);
function openNewBookModal() {
  modal.style.display = "block";
}

closeNewBookButton.addEventListener("click", closeNewBookModal);
function closeNewBookModal() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
}

const newBookForm = document.querySelector("#newBookForm");
newBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const finished = document.querySelector("#finished").checked ? true : false;

  addBookToLibrary({
    title: title, 
    author: author, 
    pages: pages, 
    isRead: finished
  });

  closeNewBookModal();
  populateLibrary();
});

populateLibrary();

function setupTrashListeners() {
  const trashIcons = document.querySelectorAll(".trash");
  trashIcons.forEach(trash => {
    trash.addEventListener("click", removeBook);
  });

  function removeBook() {
    let uuid = this.parentNode.getAttribute("data-uuid");
    myLibrary = myLibrary.filter(book => book.id !== uuid);
    populateLibrary();
  };
};

function setupToggleReadListeners() {
  const toggleReadButtons = document.querySelectorAll(".read-status");
  toggleReadButtons.forEach(button => {
    button.addEventListener("click", toggleRead);
  })

  function toggleRead() {
    let uuid = this.parentNode.getAttribute("data-uuid");
    book = myLibrary.find(book => book.id == uuid);
    if (book) book.toggleRead();
  }
}