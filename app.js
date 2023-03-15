
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
    row.innerHTML += '<td><a href ="#" class="delete"><i class="fa fa-remove"></i></a></td>';

    list.appendChild(row);
}

UI.prototype.clearFields = function(book){

    for(const attr in book){
        document.getElementById(attr).value = '';
    }
}

UI.prototype.showAlert = function(msg, className){
    
    const dv = document.createElement('div');
    dv.className = `alert ${className}`;
    
    dv.appendChild(document.createTextNode(msg));
    const container = document.querySelector('.container');
    const form = document.getElementById('book-form');
    
    container.insertBefore(dv,form);

    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);

}

UI.prototype.removeBook = function(target){
     
     if(target.parentElement.classList.contains('delete')){
        target.parentElement.parentElement.parentElement.remove();
        return true;
    }

    return false;

}

function LocalStore(){}

LocalStore.getBooks = function(){
    
    let books;

    if(localStorage.getItem('books') === null){
        books = [];
    } else {
        books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
    
}


LocalStore.displayBooks = function(){

    const books = LocalStore.getBooks();

    const interface = new UI();

    books.forEach(function(book){
        interface.addBook(book);
    });


}


LocalStore.addBook = function(book){

    let books  = LocalStore.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));

}


LocalStore.removeBook = function(isbn){
    
    
    let books = LocalStore.getBooks();

    books.forEach(function(book, index){
        if(book.isbn === isbn){
            books.splice(index, 1);         
        }
    })
    
    localStorage.setItem('books', JSON.stringify(books));

}

LocalStore.checkISBN = function(isbn){

    let books = LocalStore.getBooks();

    if(books.length == 0){
        return false;
    } else {

    for(let book in books){
        if(books[book].isbn === isbn){
            return true
        }
    }
    }


}


document.addEventListener('DOMContentLoaded', LocalStore.displayBooks())


document.getElementById('book-form').addEventListener('submit', 
 function(e){

    const title = document.getElementById('title').value;
        author = document.getElementById('author').value;
        isbn = document.getElementById('isbn').value,
        year = document.getElementById('year').value
 
    const book = new Book(title, author, isbn, year);

    const interface = new UI();

    if(title == ''|| author == '' || isbn == '' || year == ''){

        interface.showAlert('Please fill in all fields', 'error');
    
    } else if(LocalStore.checkISBN(isbn)){

        interface.showAlert(`A book with the ISBN : #${isbn} is already part of the list`, 'error');
        
    } else {

        interface.addBook(book);
        LocalStore.addBook(book);
        interface.clearFields(book);
        interface.showAlert('The Book was added to your list', 'success');
    }

    e.preventDefault();
})

document.getElementById('book-list').addEventListener('click', function(e){
    
    const interface = new UI();

    if(interface.removeBook(e.target)){
        
        LocalStore.removeBook(e.target.parentElement.parentElement.previousElementSibling.previousElementSibling.textContent);   
        
        interface.showAlert('The book has been removed', 'remove');
    }

    e.preventDefault();
})