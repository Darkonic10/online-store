import Page from "../../core/page";
import { getBookByID, createElementWithOptions, formatterUSD, getMapBasketStorage, setHeaderCounters } from "../../types/checks";
import { keysMain, PageIds, reg } from "../../types/enums";
import { book } from "../../types/Interfaces";
import { addModal } from "../modal/modal";

class BookPage extends Page {
  private readonly chosenBookID: number;
  
  static TextObject = {
    MainTitle: 'Book Page',
  };

  constructor(id: string, chosenBookID: number) {
    super(id);
    this.chosenBookID = chosenBookID;
  }

  render(): HTMLElement {
    setHeaderCounters();

    const content: HTMLDivElement = createElementWithOptions('div', HTMLDivElement, {className: 'main-div'});
    const currentBook: book = getBookByID(this.chosenBookID);

    const breadCrumps = createElementWithOptions('div', HTMLDivElement, {className: 'path'});
    let href = `#${PageIds.MainPage}?${keysMain.Publisher}=${currentBook.publisher.replace(reg, '')}`;
    const breadPublisher = createElementWithOptions('a', HTMLAnchorElement, {className: 'links', textContent: currentBook.publisher, href: href});
    href = `#${PageIds.MainPage}?${keysMain.Genre}=${currentBook.genre.replace(/ /g, '')}`;
    const breadGenre = createElementWithOptions('a', HTMLAnchorElement, {className: 'links', textContent: currentBook.genre, href: href});
    href = `#${PageIds.MainPage}?${keysMain.Search}=${currentBook.author.toUpperCase()}`;
    const breadAuthor = createElementWithOptions('a', HTMLAnchorElement, {className: 'links', textContent: currentBook.author, href: href});
    href = `#${PageIds.MainPage}?${keysMain.Search}=${currentBook.title.toUpperCase()}`;
    const breadTitle = createElementWithOptions('a', HTMLAnchorElement, {className: 'links', textContent: currentBook.title, href: href});

    const booksItemsMap: Map<string, number> = getMapBasketStorage('basketIds');

    const mainDiv: HTMLDivElement = createElementWithOptions('div', HTMLDivElement, {className: 'container main__container main__container_start'});
    const miniImgContainer: HTMLDivElement = createElementWithOptions('div', HTMLDivElement, {className: 'book_mini-img-container'});
    const bigImg: HTMLDivElement = createElementWithOptions('div', HTMLDivElement);
    const img: HTMLImageElement = createElementWithOptions('img', HTMLImageElement, {className: 'book__big-img', src: currentBook.book_image[0]});
    const desc: HTMLDivElement = createElementWithOptions('div', HTMLDivElement, {className: 'book__desc'});
    const buttons: HTMLDivElement = createElementWithOptions('div', HTMLDivElement, {className: 'book__buttons'});
    const name: HTMLHeadingElement = createElementWithOptions('h2', HTMLHeadingElement, {innerText: currentBook.title});
    const author: HTMLHeadingElement = createElementWithOptions('h3', HTMLHeadingElement, {innerText: currentBook.author});
    const description: HTMLParagraphElement = createElementWithOptions('p', HTMLParagraphElement, {innerText: currentBook.description});
    const genre: HTMLParagraphElement = createElementWithOptions('p', HTMLParagraphElement, {innerText: `Genre: ${currentBook.genre}`});
    const publisher: HTMLParagraphElement = createElementWithOptions('p', HTMLParagraphElement, {innerText: `Publisher: ${currentBook.publisher}`});
    const stock: HTMLParagraphElement = createElementWithOptions('p', HTMLParagraphElement, {innerText: `Stock: ${currentBook.stock_balance.toString()}`});
    const price: HTMLHeadingElement = createElementWithOptions('h1', HTMLHeadingElement, {innerText: `${formatterUSD.format(currentBook.price)}`});
    const addButton: HTMLButtonElement = createElementWithOptions('button', HTMLButtonElement, {className: 'button main__button-add'});
    if (!booksItemsMap.has(currentBook.id.toString())) {
      addButton.innerText = 'Add';
    } else {
      addButton.innerText = 'Remove';
    }
    const buyButton: HTMLButtonElement = createElementWithOptions('button', HTMLButtonElement, {className: 'button basket__buy-button'});
    buyButton.textContent = 'Buy Now';

    breadCrumps.append(breadPublisher);
    breadCrumps.innerHTML += ' >> ';
    breadCrumps.append(breadGenre);
    breadCrumps.innerHTML += ' >> ';
    breadCrumps.append(breadAuthor);
    breadCrumps.innerHTML += ' >> ';
    breadCrumps.append(breadTitle);

    bigImg.append(img);
    desc.append(name, author, description, genre, publisher, stock);
    buttons.append(price, addButton, buyButton);
    mainDiv.append(miniImgContainer, bigImg, desc, buttons);
    content.append(breadCrumps, mainDiv);
    this.container.append(content);

    for (let i = 0; i < currentBook.book_image.length; i++) {
      const element = currentBook.book_image[i];
      const miniImg: HTMLImageElement = createElementWithOptions('img', HTMLImageElement, {className: 'book__mini-img', src: element});
      miniImgContainer.append(miniImg);
      miniImg.addEventListener('click', () => {
        img.src = miniImg.src;
      })
    }

    addButton.addEventListener('click', () => {
      if (!booksItemsMap.has(currentBook.id.toString())) {
        booksItemsMap.set(currentBook.id.toString(), 1);
        addButton.innerText = 'Remove';
      } else {
        booksItemsMap.delete(currentBook.id.toString());
        addButton.innerText = 'Add';
      }
      localStorage.setItem('basketIds', JSON.stringify(Object.fromEntries(booksItemsMap)));

      setHeaderCounters();

    })

    addModal(this.container, buyButton);

    return this.container;
  }
}

export default BookPage;
