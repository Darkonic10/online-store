import { book } from "../../../types/Interfaces";

class Content {
  renderContent(chosenBooks: book[]): HTMLDivElement {
    const content: HTMLDivElement = document.createElement('div');
    content.className = 'main';
    const bookList: HTMLDivElement = document.createElement('div');
    bookList.className = 'container main__container';
    content.appendChild(bookList);
    for (const book of chosenBooks) {
      const bookDiv: HTMLDivElement = document.createElement('div');
      bookDiv.className = 'main__book-card'
      const bookImg: HTMLImageElement = document.createElement('img');
      bookImg.className = 'main__book-img';
      bookImg.src = book.book_image[0];
      bookImg.alt = `Image of the book ${book.title}`;
      const bookInfo: HTMLDivElement = document.createElement('div');
      bookInfo.className = 'main__book-info'
      const bookTitle: HTMLParagraphElement = document.createElement('p');
      bookTitle.innerText = `${book.title}`
      bookTitle.className = 'main__book-title'
      const bookGenre: HTMLParagraphElement = document.createElement('p');
      bookGenre.innerText = `Genre: ${book.genre}`
      const bookAuthor: HTMLParagraphElement = document.createElement('p');
      bookAuthor.innerText = `Author: ${book.author}`
      const bookPrice: HTMLParagraphElement = document.createElement('p');
      bookPrice.innerText = `Price: $${book.price}`
      const bookStock: HTMLParagraphElement = document.createElement('p');
      bookStock.innerText = `Stock: ${book.stock_balance}`

      bookInfo.append(bookTitle, bookGenre, bookAuthor, bookPrice, bookStock);
      bookDiv.append(bookImg, bookInfo);
      bookList.append(bookDiv)
    }
    return content;
  }
}

export default Content;