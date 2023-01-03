import { book } from "../../../types/Interfaces";
import { formatterUSD, getElementBySelector, getLocalStorage } from "../../../types/checks";
import { PageIds } from "../../../types/enums";

class Content {
  renderContent(chosenBooks: book[]): HTMLDivElement {
    const content: HTMLDivElement = document.createElement('div');
    content.className = 'main-div';
    const bookList: HTMLDivElement = document.createElement('div');
    bookList.className = 'container main__container';
    content.appendChild(bookList);
    const booksItemsMap: Map<string, number> = new Map(Object.entries(JSON.parse(getLocalStorage(localStorage, 'basketIds')) as { [s: string]: number; }));
    let totalPrice = 0;
    let countItems = 0;

    for (const entry of booksItemsMap) {
      countItems += entry[1];
      totalPrice += chosenBooks[+entry[0] - 1].price * entry[1];
    }
    let usdTotal: string = formatterUSD.format(totalPrice);

    const basketCounter: HTMLSpanElement = getElementBySelector(document, HTMLSpanElement, '.header__counter-span');
    basketCounter.innerText = `${countItems}`;
    const totalPriceHTML: HTMLSpanElement = getElementBySelector(document, HTMLSpanElement, '.header__price-value');
    totalPriceHTML.innerText = `${usdTotal}`;

    for (const book of chosenBooks) {
      const bookDiv: HTMLDivElement = document.createElement('div');
      bookDiv.className = 'main__book-card'
      bookDiv.id = `id-book-${book.id}`;
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
      if(!booksItemsMap.has(book.id.toString())) {
        bookButtonAdd.innerText = 'Add';
      } else {
        bookButtonAdd.innerText = 'Remove';
      }

      const bookButtonDetail: HTMLButtonElement = document.createElement('button');
      bookButtonDetail.className = 'button main__button-detail';
      bookButtonDetail.innerText = 'Detail';

      bookButtons.addEventListener('click', (event) => {
        if(event.target === bookButtonAdd) {
          if(!booksItemsMap.has(book.id.toString())) {
            booksItemsMap.set(book.id.toString(), 1);
            bookButtonAdd.innerText = 'Remove';
          } else {
            booksItemsMap.delete(book.id.toString());
            bookButtonAdd.innerText = 'Add';
          }
          totalPrice = 0;
          countItems = 0;
          for (const entry of booksItemsMap) {
            countItems += entry[1];
            totalPrice += chosenBooks[+entry[0] - 1].price * entry[1];
          }
          usdTotal = formatterUSD.format(totalPrice);
          localStorage.setItem('basketIds', JSON.stringify(Object.fromEntries(booksItemsMap)))
          basketCounter.innerText = `${countItems}`;
          totalPriceHTML.innerText = `${usdTotal}`;
        }

        if (event.target === bookButtonDetail) {
          console.log(`Selected book id: ${book.id}`);
          window.location.hash = `#${PageIds.BookPage}?id=${book.id}`;
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