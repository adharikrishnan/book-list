function Book(title, author, isbn, year){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.year = year;
}


function UI(){}

UI.prototype.addBook = function(book) {
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');

    for(const detail in book){
        const entry = document.createElement('td');
        entry.appendChild(document.createTextNode(book[detail]));
        row.appendChild(entry);
    }
    row.innerHTML += '<td><a href ="#" class="delete">X</td>';

    list.appendChild(row);
}

UI.prototype.clearFields = function(book){

    for(const attr in book){
        document.getElementById(attr).value = '';
    }
    console.log('cleared');
}

document.getElementById('book-form').addEventListener('submit', 
 function(e){

    const title = document.getElementById('title').value;
        author = document.getElementById('author').value;
        isbn = document.getElementById('isbn').value,
        year = document.getElementById('year').value
 
    const book = new Book(title, author, isbn, year);

    const interface = new UI();

    interface.addBook(book);

    interface.clearFields(book);

    e.preventDefault();
})