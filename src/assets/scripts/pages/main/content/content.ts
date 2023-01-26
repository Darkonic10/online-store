import { book } from '../../../types/Interfaces';
import { createElementWithOptions, formatterUSD, getMapBasketStorage, setHeaderCounters } from '../../../types/checks';
import { PageIds } from '../../../types/enums';

class Content {
  renderContent(chosenBooks: book[], mode: string): HTMLDivElement {
    const content: HTMLDivElement = createElementWithOptions('div', HTMLDivElement, { className: 'main-div' });
    const bookList: HTMLDivElement = createElementWithOptions('div', HTMLDivElement, { className: 'container main__container main__container_flex' });
    content.appendChild(bookList);
    if (chosenBooks.length === 0) {
      const textMessage = 'No books by your search request! Please change your search request or Reset Filters.';
      const message: HTMLHeadingElement = createElementWithOptions('h1', HTMLHeadingElement, {
        className: 'main__message',
        textContent: textMessage,
      });
      bookList.appendChild(message);
    }
    const booksItemsMap: Map<string, number> = getMapBasketStorage('basketIds');

    setHeaderCounters();

    for (const book of chosenBooks) {
      const bookDiv: HTMLDivElement = createElementWithOptions('div', HTMLDivElement, {
        className: 'main__book-card',
        id: `id-book-${book.id}`,
      });
      const bookImg: HTMLImageElement = createElementWithOptions('img', HTMLImageElement, {
        className: 'main__book-img',
        src: book.book_image[0],
        alt: `Image of the book ${book.title}`,
      });
      const bookInfo: HTMLDivElement = createElementWithOptions('div', HTMLDivElement, { className: 'main__book-info' });
      const bookTitle: HTMLParagraphElement = createElementWithOptions('p', HTMLParagraphElement, {
        innerText: `${book.title}`,
        className: 'main__book-title',
      });
      const bookAuthor: HTMLParagraphElement = createElementWithOptions('p', HTMLParagraphElement, {
        innerText: `Author: ${book.author}`,
        className: 'bold',
      });
      bookInfo.append(bookTitle, bookAuthor);
      if (mode !== 'mini') {
        const bookGenre: HTMLParagraphElement = createElementWithOptions('p', HTMLParagraphElement, { innerText: `Genre: ${book.genre}` });
        const bookPrice: HTMLParagraphElement = createElementWithOptions('p', HTMLParagraphElement, { innerText: `Price: ${formatterUSD.format(book.price)}` });
        const bookStock: HTMLParagraphElement = createElementWithOptions('p', HTMLParagraphElement, { innerText: `Stock: ${book.stock_balance}` });
        bookInfo.append(bookGenre, bookPrice, bookStock);
      }
      const bookButtons: HTMLDivElement = createElementWithOptions('div', HTMLDivElement, { className: 'main__book-buttons' });
      const bookButtonAdd: HTMLButtonElement = createElementWithOptions('button', HTMLButtonElement, { className: 'button main__button-add' });
      if (!booksItemsMap.has(book.id.toString())) {
        bookButtonAdd.innerText = 'Add';
      } else {
        bookButtonAdd.innerText = 'Remove';
      }

      if (mode === 'mini') {
        bookDiv.classList.add('main__book-card-mini');
        bookImg.classList.add('main__book-img-mini');
        bookInfo.classList.add('main__book-info-mini');
      }

      const bookButtonDetail: HTMLButtonElement = createElementWithOptions('button', HTMLButtonElement, {
        className: 'button main__button-detail',
        innerText: 'Detail',
      });

      bookButtons.addEventListener('click', (event) => {
        if (event.target === bookButtonAdd) {
          if (!booksItemsMap.has(book.id.toString())) {
            booksItemsMap.set(book.id.toString(), 1);
            bookButtonAdd.innerText = 'Remove';
          } else {
            booksItemsMap.delete(book.id.toString());
            bookButtonAdd.innerText = 'Add';
          }
          localStorage.setItem('basketIds', JSON.stringify(Object.fromEntries(booksItemsMap)));
          setHeaderCounters();
        }

        if (event.target === bookButtonDetail) {
          console.log(`Selected book id: ${book.id}`);
          window.location.hash = `#${PageIds.BookPage}?id=${book.id}`;
        }
      });

      bookButtons.append(bookButtonAdd, bookButtonDetail);

      bookDiv.append(bookImg, bookInfo, bookButtons);
      bookList.append(bookDiv);
    }
    return content;
  }
}

export default Content;
