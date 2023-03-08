function Book(title, author, isbn, year){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.year = year;
}


function UI(){}

UI.prototype.addBook = function(book) {
    const list = document.getElementById('book-list');
    
}


document.getElementById('book-form').addEventListener('submit', function(e){
    const title = document.getElementById('title').value,
          author = document.getElementsById('author').value,
          isbn = document.getElementById('isbn').value,
          year = document.getElementById('year').value;

    const book = new Book(title, author, isbn, year);

    const UI = new UI();



    e.preventDefault();
})