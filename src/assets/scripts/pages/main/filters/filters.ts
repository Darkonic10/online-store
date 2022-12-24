import { books } from "../../../data/books";
import { getElementBySelector } from "../../../types/checks";
import noUiSlider from "nouislider";

class Filters {
  renderFilters(): HTMLElement {
    const section: HTMLElement = document.createElement('section');
    section.className = 'filters';
    const baseDiv: HTMLElement = document.createElement('div');
    section.appendChild(baseDiv);
    baseDiv.className = 'container filters__container';
    baseDiv.innerHTML = `
      <div class="filters__wrapper">
        <div class="filters__genre">
          <h3 class="filters__genre-title">Genre</h3>
        </div>
        <div class="filters__author">
          <h3 class="filters__authors-title">Author</h3>
        </div>
        <div class="filters__sliders">
        <div class="filters__price">
            <h3 class="filters__price-title">Price</h3>
            <div class="filters__price-minmax">
              <p class="filters__price-min">0</p>
              ⟷
              <p class="filters__price-max">0</p>
            </div>
            <div id="slider-price"></div>
          </div>
          <div class="filters__stock">
            <h3 class="filters__stock-title">Stock</h3>
            <div class="filters__stock-minmax">
              <p class="filters__stock-min">0</p>
              ⟷
              <p class="filters__stock-max">0</p>
            </div>
            <div id="slider-stock"></div>
          </div>
        </div>
        </div>
        <button class="filters__filter-reset">Reset Filters</button>
        <div class="filters__search">
        <form class="filters__search-form">
          <input class="filters__search-input" type="search" name="q" placeholder="Search for books by keyword">
          <input class="filters__search-submit" type="submit" value="">
          </form>
          </div>`
    const filterGenre: HTMLDivElement = getElementBySelector(baseDiv, HTMLDivElement, '.filters__genre');
    const filterAuthor: HTMLDivElement = getElementBySelector(baseDiv, HTMLDivElement, '.filters__author');
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
    
    const sliderPrice: HTMLDivElement = getElementBySelector(baseDiv, HTMLDivElement, '#slider-price');
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const minPriceHTML: HTMLParagraphElement = getElementBySelector(baseDiv, HTMLParagraphElement, '.filters__price-min');
    const maxPriceHTML: HTMLParagraphElement = getElementBySelector(baseDiv, HTMLParagraphElement, '.filters__price-max');
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

    const sliderStock: HTMLDivElement = getElementBySelector(baseDiv, HTMLDivElement, '#slider-stock');
    const minStock = Math.min(...stocks);
    const maxStock = Math.max(...stocks);
    const minStockHTML: HTMLParagraphElement = getElementBySelector(baseDiv, HTMLParagraphElement, '.filters__stock-min');
    const maxStockHTML: HTMLParagraphElement = getElementBySelector(baseDiv, HTMLParagraphElement, '.filters__stock-max');
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