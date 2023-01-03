import Page from "../../core/page";
import { books } from "../../data/books";
import { createElementByTag, formatterUSD } from "../../types/checks";
import { PageIds } from "../../types/enums";
import { book } from "../../types/Interfaces";


class BookPage extends Page {
  private readonly chosenBookID: number;
  
  static TextObject = {
    MainTitle: 'BookPage',
  };

  constructor(id: string, chosenBookID: number) {
    super(id);
    this.chosenBookID = chosenBookID;
  }

  render(): HTMLElement {
    const content: HTMLDivElement = document.createElement('div');
    content.className = 'main-div';
    const title = this.createHeaderTitle(BookPage.TextObject.MainTitle);
    
    const currentBook:book = books[this.chosenBookID - 1];

    // const test = document.createElement('a');

    const breadCrumps = createElementByTag('div', 'path', HTMLDivElement);
    const breadPublisher = createElementByTag('a', 'links', HTMLAnchorElement, currentBook.publisher);
    breadPublisher.href = `#${PageIds.MainPage}?publisher=${currentBook.publisher}   `;
    const breadGenre = createElementByTag('a', 'links', HTMLAnchorElement, currentBook.genre);
    breadGenre.href = `#${PageIds.MainPage}?genre=${currentBook.genre}   `;
    const breadAuthor = createElementByTag('a', 'links', HTMLAnchorElement, currentBook.author);
    breadAuthor.href = `#${PageIds.MainPage}?search=${currentBook.author}   `;
    const breadTitle = createElementByTag('a', 'links', HTMLAnchorElement, currentBook.title);
    breadTitle.href = `#${PageIds.MainPage}?search=${currentBook.title}   `;

    const mainDiv: HTMLDivElement = document.createElement('div');
    mainDiv.className = 'container main__container';
    const miniImgContainer: HTMLDivElement = document.createElement('div');
    const bigImg: HTMLDivElement = document.createElement('div');
    const img: HTMLImageElement = document.createElement('img');
    img.className = 'book__big-img';
    img.src = currentBook.book_image[0];
    const desc: HTMLDivElement = document.createElement('div');
    desc.className = 'book__desc';
    const buttons: HTMLDivElement = document.createElement('div');
    const name: HTMLHeadingElement = document.createElement('h2');
    name.innerText = currentBook.title;
    const author: HTMLHeadingElement = document.createElement('h3');
    author.innerText = currentBook.author;
    const description: HTMLParagraphElement = document.createElement('p');
    description.innerText = currentBook.description;
    const genre: HTMLParagraphElement = document.createElement('p');
    genre.innerText = `Genre: ${currentBook.genre}`;
    const publisher: HTMLParagraphElement = document.createElement('p');
    publisher.innerText = `Publisher: ${currentBook.publisher}`;
    const stock: HTMLParagraphElement = document.createElement('p');
    stock.innerText = `Stock: ${currentBook.stock_balance.toString()}`;
    const price: HTMLHeadingElement = document.createElement('h1');
    price.innerText = `${formatterUSD.format(currentBook.price)}`;
    const addButton: HTMLButtonElement = document.createElement('button');
    addButton.className = 'button main__button-add';
    addButton.textContent = 'Add to cart';
    const buyButton: HTMLButtonElement = document.createElement('button');
    buyButton.className = 'button basket__buy-button';
    buyButton.textContent = 'Buy Now';
    
    this.container.append(content);
    content.appendChild(title)

    content.appendChild(breadCrumps);
    breadCrumps.appendChild(breadPublisher);
    breadCrumps.appendChild(breadGenre);
    breadCrumps.appendChild(breadAuthor);
    breadCrumps.appendChild(breadTitle);

    bigImg.appendChild(img);
    mainDiv.appendChild(miniImgContainer);
    mainDiv.appendChild(bigImg);
    mainDiv.appendChild(desc);
    desc.appendChild(name);
    desc.appendChild(author);
    desc.appendChild(description);
    desc.appendChild(genre);
    desc.appendChild(publisher);
    desc.appendChild(stock);
    mainDiv.appendChild(buttons);
    buttons.appendChild(price);
    buttons.appendChild(addButton);
    buttons.appendChild(buyButton);
    content.append(mainDiv);

    for (let i = 0; i < currentBook.book_image.length; i++) {
      const element = currentBook.book_image[i];
      const miniImg: HTMLImageElement = document.createElement('img');
      miniImg.className = 'book__mini-img';
      miniImg.src = element;
      miniImgContainer.appendChild(miniImg);
      miniImg.addEventListener('click', () => {
        img.src = miniImg.src;
      })
    }

    return this.container;
  }
}

export default BookPage;
