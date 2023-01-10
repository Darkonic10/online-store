import { book } from "../../../types/Interfaces";
import { checkBookId, createElementByTag, formatterUSD, getElementBySelector, getMapBasketStorage, setHeaderCounters } from "../../../types/checks";
import { PageIds } from "../../../types/enums";

class Content {
  renderContent(chosenBooks: book[], mode: string): HTMLDivElement {
    const content: HTMLDivElement = document.createElement('div');
    content.className = 'main-div';
    const bookList: HTMLDivElement = document.createElement('div');
    bookList.className = 'container main__container main__container_flex';
    content.appendChild(bookList);
    if (chosenBooks.length === 0) {
      const textMessage = 'No books by your search request! Please change your search request or Reset Filters.';
      const message: HTMLHeadingElement = createElementByTag('h1', 'main__message', HTMLHeadingElement, textMessage)
      bookList.appendChild(message);
    }
    const booksItemsMap: Map<string, number> = getMapBasketStorage('basketIds');
    let totalPrice = 0;
    let countItems = 0;

    let usdTotal: string = formatterUSD.format(totalPrice);

    const basketCounter: HTMLSpanElement = getElementBySelector(document, HTMLSpanElement, '.header__counter-span');
    const totalPriceHTML: HTMLSpanElement = getElementBySelector(document, HTMLSpanElement, '.header__price-value');

    setHeaderCounters();

    for (const book of chosenBooks) {
      const bookDiv: HTMLDivElement = document.createElement('div');
      bookDiv.className = 'main__book-card';
      bookDiv.id = `id-book-${book.id}`;
      const bookImg: HTMLImageElement = document.createElement('img');
      bookImg.className = 'main__book-img';
      bookImg.src = book.book_image[0];
      bookImg.alt = `Image of the book ${book.title}`;
      const bookInfo: HTMLDivElement = document.createElement('div');
      bookInfo.className = 'main__book-info';
      const bookTitle: HTMLParagraphElement = document.createElement('p');
      bookTitle.innerText = `${book.title}`;
      bookTitle.className = 'main__book-title';
      const bookAuthor: HTMLParagraphElement = document.createElement('p');
      bookAuthor.innerText = `Author: ${book.author}`;
      bookAuthor.classList.add('bold');
      bookInfo.append(bookTitle, bookAuthor);
      if (mode !== 'mini') {
        const bookGenre: HTMLParagraphElement = document.createElement('p');
        bookGenre.innerText = `Genre: ${book.genre}`;
        const bookPrice: HTMLParagraphElement = document.createElement('p');
        bookPrice.innerText = `Price: $${book.price}`;
        const bookStock: HTMLParagraphElement = document.createElement('p');
        bookStock.innerText = `Stock: ${book.stock_balance}`;
        bookInfo.append(bookGenre, bookPrice, bookStock);
      }
      const bookButtons: HTMLDivElement = document.createElement('div');
      bookButtons.className = 'main__book-buttons';
      const bookButtonAdd: HTMLButtonElement = document.createElement('button');
      bookButtonAdd.className = 'button main__button-add';
      if(!booksItemsMap.has(book.id.toString())) {
        bookButtonAdd.innerText = 'Add';
      } else {
        bookButtonAdd.innerText = 'Remove';
      }
      
      if (mode === 'mini') {
        bookDiv.classList.add('main__book-card-mini');
        bookImg.classList.add('main__book-img-mini');
        bookInfo.classList.add('main__book-info-mini');
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
            totalPrice += checkBookId(+entry[0]).price * entry[1];
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

      bookDiv.append(bookImg, bookInfo, bookButtons);
      bookList.append(bookDiv)
    }
    return content;
  }
}

export default Content;
