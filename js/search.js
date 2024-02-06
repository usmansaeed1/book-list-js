document.querySelector('.searchBtn').addEventListener('click', (e) => {
    console.log('searching');
    const query = document.querySelector('#search-input').value;
    const result = Store.searchBook(query);
    UI.clearBooks();
    UI.displayBooks(result); 
  });