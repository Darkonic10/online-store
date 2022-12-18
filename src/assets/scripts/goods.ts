import {books} from "./data/books";
import noUiSlider from 'nouislider';

function getFilters(): void {
  const filterGenre: HTMLDivElement | undefined = document.querySelector('.filters__genre') as HTMLDivElement;
  const filterAuthor: HTMLDivElement | undefined = document.querySelector('.filters__author') as HTMLDivElement;
  const genreCheckboxList: HTMLUListElement = document.createElement('ul');
  genreCheckboxList.className = 'filters__genre-list';
  const authorCheckboxList: HTMLUListElement = document.createElement('ul');
  authorCheckboxList.className = 'filters__author-list';
  const arrGenres: string[] = [];
  const arrAuthors: string[] = [];
  const prices: number[] = [];
  const stocks: number[] = [];

  for (const book of books) {
    prices.push(book.price);
    stocks.push(book.stock_balance);
    if(!arrGenres.includes(book.genre)) {
      arrGenres.push(book.genre);
      const genreCheckboxItem: HTMLLIElement = document.createElement('li');
      const genreCheckboxInput: HTMLInputElement = document.createElement('input');
      const genreCheckboxLabel: HTMLLabelElement = document.createElement('label');
      genreCheckboxItem.className = 'filters__genre-item'
      genreCheckboxItem.append(genreCheckboxInput, genreCheckboxLabel);
      genreCheckboxInput.type = 'checkbox'
      genreCheckboxInput.id = `genre ${String(book.id)}`
      genreCheckboxLabel.innerText = `${book.genre}`
      genreCheckboxLabel.setAttribute('for', `genre ${String(book.id)}`)
      genreCheckboxList.append(genreCheckboxItem)
    }
    if(!arrAuthors.includes(book.author)) {
      arrGenres.push(book.author);
      const authorCheckboxItem: HTMLLIElement = document.createElement('li');
      const authorCheckboxInput: HTMLInputElement = document.createElement('input');
      const authorCheckboxLabel: HTMLLabelElement = document.createElement('label');
      authorCheckboxItem.className = 'filters__author-item'
      authorCheckboxItem.append(authorCheckboxInput, authorCheckboxLabel);
      authorCheckboxInput.type = 'checkbox'
      authorCheckboxInput.id = `author ${String(book.id)}`
      authorCheckboxLabel.innerText = `${book.author}`
      authorCheckboxLabel.setAttribute('for', `author ${String(book.id)}`)
      authorCheckboxList.append(authorCheckboxItem)
    }
  }
  filterGenre.append(genreCheckboxList);
  filterAuthor.append(authorCheckboxList)

  const sliderPrice: HTMLDivElement | undefined = document.querySelector('#slider-price') as HTMLDivElement
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const minPriceHTML: HTMLParagraphElement | undefined = document.querySelector('.filters__price-min') as HTMLParagraphElement;
  const maxPriceHTML: HTMLParagraphElement | undefined = document.querySelector('.filters__price-max') as HTMLParagraphElement;
  minPriceHTML.innerText = String(minPrice);
  maxPriceHTML.innerText = String(maxPrice);
  noUiSlider.create(sliderPrice, {
    start: [0, 100],
    connect: true,
    range: {
      'min': minPrice,
      'max': maxPrice
    }
  })

  const sliderStock: HTMLDivElement | undefined = document.querySelector('#slider-stock') as HTMLDivElement
  const minStock = Math.min(...stocks);
  const maxStock = Math.max(...stocks);
  const minStockHTML: HTMLParagraphElement | undefined = document.querySelector('.filters__stock-min') as HTMLParagraphElement;
  const maxStockHTML: HTMLParagraphElement | undefined = document.querySelector('.filters__stock-max') as HTMLParagraphElement;
  minStockHTML.innerText = String(minStock);
  maxStockHTML.innerText = String(maxStock);
  noUiSlider.create(sliderStock, {
    start: [0, 100],
    connect: true,
    range: {
      'min': minPrice,
      'max': maxPrice
    }
  })
}

function getBooksCards(): void {
  const mainContainer: HTMLDivElement | undefined = document.querySelector('.main__container') as HTMLDivElement;
  for (const book of books) {
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

    bookInfo.append(bookTitle, bookGenre, bookAuthor, bookPrice, bookStock)
    bookDiv.append(bookImg, bookInfo)
    mainContainer?.append(bookDiv)
  }
}

getFilters();
getBooksCards();