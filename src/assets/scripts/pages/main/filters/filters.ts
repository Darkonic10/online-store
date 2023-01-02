import { books } from "../../../data/books";
import { createElementByTag } from "../../../types/checks";
import noUiSlider from "nouislider";

class Filters {
  renderFilters(): HTMLElement {
    const section: HTMLElement = document.createElement('section');
    section.className = 'filters';
    const baseDiv: HTMLDivElement = createElementByTag('div', 'container filters__container', HTMLDivElement);
    section.appendChild(baseDiv);
    const fWrapper: HTMLDivElement = createElementByTag('div', 'filters__wrapper', HTMLDivElement);
    baseDiv.appendChild(fWrapper);
    const filterGenre: HTMLDivElement = createElementByTag('div', 'filters__genre', HTMLDivElement);
    fWrapper.appendChild(filterGenre);
    const filterGenreTitle: HTMLHeadingElement = createElementByTag('h3', 'filters__genre-title', HTMLHeadingElement, 'Genre');
    filterGenre.appendChild(filterGenreTitle);
    const filterAuthor: HTMLDivElement = createElementByTag('div', 'filters__author', HTMLDivElement);
    fWrapper.appendChild(filterAuthor);
    const filterAuthorTitle: HTMLHeadingElement = createElementByTag('h3', 'filters__authors-title', HTMLHeadingElement, 'Author');
    filterAuthor.appendChild(filterAuthorTitle);
    const fSliders: HTMLDivElement = createElementByTag('div', 'filters__sliders', HTMLDivElement);
    fWrapper.appendChild(fSliders);
    const fPrice: HTMLDivElement = createElementByTag('div', 'filters__price', HTMLDivElement);
    fSliders.appendChild(fPrice);
    const fPriceTitle: HTMLHeadingElement = createElementByTag('h3', 'filters__price-title', HTMLHeadingElement, 'Price');
    fPrice.appendChild(fPriceTitle);
    const minPriceHTMLMax: HTMLDivElement = createElementByTag('div', 'filters__price-minmax', HTMLDivElement)
    fPrice.appendChild(minPriceHTMLMax);
    const minPriceHTML: HTMLParagraphElement = createElementByTag('p', 'filters__price-min', HTMLParagraphElement, '0');
    minPriceHTMLMax.appendChild(minPriceHTML);
    const maxPriceHTML: HTMLParagraphElement = createElementByTag('p', 'filters__price-max', HTMLParagraphElement, '0');
    minPriceHTMLMax.appendChild(maxPriceHTML);
    const sliderPrice: HTMLDivElement = createElementByTag('div', 'slider-price', HTMLDivElement);
    sliderPrice.id = 'slider-price';
    fPrice.appendChild(sliderPrice);
    const fStock: HTMLDivElement = createElementByTag('div', 'filters__stock', HTMLDivElement);
    fSliders.appendChild(fStock);
    const fStockTitle: HTMLHeadingElement = createElementByTag('h3', 'filters__stock-title', HTMLHeadingElement, 'Stock');
    fStock.appendChild(fStockTitle);
    const minStockHTMLMax: HTMLDivElement = createElementByTag('div', 'filters__stock-minmax', HTMLDivElement)
    fStock.appendChild(minStockHTMLMax);
    const minStockHTML: HTMLParagraphElement = createElementByTag('p', 'filters__stock-min', HTMLParagraphElement, '0');
    minStockHTMLMax.appendChild(minStockHTML);
    const maxStockHTML: HTMLParagraphElement = createElementByTag('p', 'filters__stock-max', HTMLParagraphElement, '0');
    minStockHTMLMax.appendChild(maxStockHTML);
    const sliderStock: HTMLDivElement = createElementByTag('div', 'slider-stock', HTMLDivElement);
    sliderPrice.id = 'slider-stock';
    fStock.appendChild(sliderStock);
    const fReset: HTMLButtonElement = createElementByTag('button', 'filters__filter-reset', HTMLButtonElement, 'Reset Filters');
    baseDiv.appendChild(fReset);
    const fSearch: HTMLDivElement = createElementByTag('div', 'filters__search', HTMLDivElement);
    baseDiv.appendChild(fSearch);
    const fSearchFrom: HTMLFormElement = createElementByTag('form', 'filters__search-form', HTMLFormElement);
    fSearch.appendChild(fSearchFrom);
    const fsearchInput: HTMLInputElement = createElementByTag('input', 'filters__search-input', HTMLInputElement);
    fsearchInput.type = 'search'
    fsearchInput.name = 'q';
    fsearchInput.placeholder = 'Search for books by keyword';
    fSearchFrom.appendChild(fsearchInput);
    const fsearchSubmit: HTMLInputElement = createElementByTag('input', 'filters__search-submit', HTMLInputElement);
    fsearchSubmit.type = 'submit';
    fsearchSubmit.value = '';
    fSearchFrom.appendChild(fsearchSubmit);
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

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
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
    const minStock = Math.min(...stocks);
    const maxStock = Math.max(...stocks);
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
    return section;
  }
}

export default Filters;