function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  let count = 0;
  for(let i = 0; i < books.length; i++){
    for(let j =0; j < books[i].borrows.length; j++){
      if(books[i].borrows[j].returned === false){
        count += 1;
      }
    }
  }
  return count;
}
function getMostCommonGenres(books) { 
  let result = {};
  books.forEach(book => {
    if (result[book.genre] != null) {
      result[book.genre]++;
    } else {
      result[book.genre] = 1;
    }
  });
  let countArray = [];
  for (const [key, value] of Object.entries(result)) {
    countArray.push({
      'name' : key,
      'count' : value
    }); 
  }
  countArray.sort((a,b) => b.count - a.count);
  return countArray.slice(0, 5);
}

function getMostPopularBooks(books) {
 return books.map((book) => {
   return { name: book.title, count: book.borrows.length };
  }).sort((a, b) => (a.count < b.count ? 1 : -1)).slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
 let result = [];
 authors.forEach((author) => {
  let theAuthor = {
   name: `${author.name.first} ${author.name.last}`,
   count: 0
  };
  books.forEach((book) => {
   if (book.authorId === author.id) {
    theAuthor.count += book.borrows.length;
   }
  });
  result.push(theAuthor);
 });
 return result.sort((a, b) => b.count - a.count).slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
