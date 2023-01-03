import Page from "../../core/page";
import { books } from "../../data/books";
import { formatterUSD } from "../../types/checks";
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
    this.container.append(content);
    const title = this.createHeaderTitle(BookPage.TextObject.MainTitle);
    const currentBook:book = books[this.chosenBookID - 1];
    content.appendChild(title)
    const mainDiv: HTMLDivElement = document.createElement('div');
    mainDiv.className = 'container main__container';
    const miniImgContainer: HTMLDivElement = document.createElement('div');
    const bigImg: HTMLDivElement = document.createElement('div');
    const img: HTMLImageElement = document.createElement('img');
    img.className = 'book__big-img';
    img.src = currentBook.book_image[0];
    bigImg.appendChild(img);
    const desc: HTMLDivElement = document.createElement('div');
    desc.className = 'book__desc';
    const buttons: HTMLDivElement = document.createElement('div');
    mainDiv.appendChild(miniImgContainer);
    mainDiv.appendChild(bigImg);
    mainDiv.appendChild(desc);
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
    desc.appendChild(name);
    desc.appendChild(author);
    desc.appendChild(description);
    desc.appendChild(genre);
    desc.appendChild(publisher);
    desc.appendChild(stock);
    mainDiv.appendChild(buttons);
    const price: HTMLHeadingElement = document.createElement('h1');
    price.innerText = `${formatterUSD.format(currentBook.price)}`;
    buttons.appendChild(price);
    const addButton: HTMLButtonElement = document.createElement('button');
    addButton.className = 'button main__button-add';
    addButton.textContent = 'Add to cart';
    const buyButton: HTMLButtonElement = document.createElement('button');
    buyButton.className = 'button basket__buy-button';
    buyButton.textContent = 'Buy Now';
    buttons.appendChild(addButton);
    buttons.appendChild(buyButton);
    for (let i = 0; i < currentBook.book_image.length; i++) {
      const element = currentBook.book_image[i];
      const miniImg: HTMLImageElement = document.createElement('img');
      miniImg.className = 'book__mini-img';
      miniImg.src = element;
      miniImgContainer.appendChild(miniImg);
    }
    content.append(mainDiv);
    return this.container;
  }
}

export default BookPage;
