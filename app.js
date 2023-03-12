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

    } else {
        
        interface.addBook(book);
        interface.clearFields(book);
        interface.showAlert('The Book was added to your list', 'success');
    }


    e.preventDefault();
})