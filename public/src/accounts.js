function findAccountById(accounts, id) {
  let result = accounts.find(personId => personId.id === id)
  return result;
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1)
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  const { id: accId } = account;
  return books.reduce((accumulator, book) => {
    return (accumulator + book.borrows.filter(borrow => borrow.id === accId).reduce((accumulatorBorrows, borrow) => accumulatorBorrows + 1, 0)
    );
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
 let result = [];
 let match = [];
 books.forEach((item) => {
  const borrowed = item.borrows;
  const book = {
   id: item.id,
   title: item.title,
   genre: item.genre,
   authorId: item.authorId,
   author: {},
   borrows: {}
  };
  const { id, title, genre, authorId, author, borrows } = book;

  borrowed.forEach((borrow) => {
   if (borrow.id === account.id && borrow.returned === false) {
    result.push(book);
    match.push(borrow);
    book.borrows = match;
    book.author = authors.filter((auth) => auth.id === book.authorId)[0];
   }
  });
 });
 return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
