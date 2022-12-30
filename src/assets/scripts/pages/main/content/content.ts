import { book } from "../../../types/Interfaces";
import {getElementBySelector, getLocalStorage} from "../../../types/checks";

class Content {
  renderContent(chosenBooks: book[]): HTMLDivElement {
    const content: HTMLDivElement = document.createElement('div');
    content.className = 'main-div';
    const bookList: HTMLDivElement = document.createElement('div');
    bookList.className = 'container main__container';
    content.appendChild(bookList);
    const countBasket: Array<number> = JSON.parse(getLocalStorage(localStorage, 'basketIds')) as Array<number>;

    const basketCounter: HTMLSpanElement = getElementBySelector(document, HTMLSpanElement, '.header__counter-span');
    basketCounter.innerText = `${countBasket.length}`;
    const totalPriceHTML: HTMLSpanElement = getElementBySelector(document, HTMLSpanElement, '.header__price-value');
    let totalPrice = 0;
    for (let i = 0; i < countBasket.length; i++) {
      totalPrice += chosenBooks[countBasket[i] - 1].price
    }
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
    totalPriceHTML.innerText = `$${totalPrice}.00`

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
      bookStock.innerText = `Stock: ${book.stock_balance}`;
      const bookButtons: HTMLDivElement = document.createElement('div');
      bookButtons.className = 'main__book-buttons';
      const bookButtonAdd: HTMLButtonElement = document.createElement('button');
      bookButtonAdd.className = 'button main__button-add';
      if(!countBasket.includes(book.id)) {
        bookButtonAdd.innerText = 'Add';
      } else {
        bookButtonAdd.innerText = 'Remove';
      }

      const bookButtonDetail: HTMLButtonElement = document.createElement('button');
      bookButtonDetail.className = 'button main__button-detail';
      bookButtonDetail.innerText = 'Detail';

      bookButtons.addEventListener('click', (event) => {
        if(event.target === bookButtonAdd) {
          if(!countBasket.includes(book.id)) {
            countBasket.push(book.id);
            bookButtonAdd.innerText = 'Remove';
          } else {
            countBasket.splice(countBasket.indexOf(book.id), 1);
            bookButtonAdd.innerText = 'Add';
          }
          basketCounter.innerText = `${countBasket.length}`;
          localStorage.setItem('basketIds', JSON.stringify(countBasket));

          totalPrice = 0;
          for (let i = 0; i < countBasket.length; i++) {
            totalPrice += chosenBooks[countBasket[i] - 1].price
          }
          localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
          totalPriceHTML.innerText = `$${totalPrice}.00`
        }
      })

      bookButtons.append(bookButtonAdd, bookButtonDetail)

      bookInfo.append(bookTitle, bookGenre, bookAuthor, bookPrice, bookStock);
      bookDiv.append(bookImg, bookInfo, bookButtons);
      bookList.append(bookDiv)
    }
    return content;
  }
}

export default Content;