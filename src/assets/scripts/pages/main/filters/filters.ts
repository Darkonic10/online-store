import { books } from "../../../data/books";
import { createElementWithOptions, getElementBySelector, getMainAddress, mainOptions, resetMainOptions, setMainOptions } from "../../../types/checks";
import noUiSlider from "nouislider";
import { delimeter, keysMain, reg, SortOptions } from "../../../types/enums";
import { book } from "../../../types/Interfaces";

class Filters {
  private sort: string;
  private genre: string[];
  private publisher: string[];
  private minPriceOpt: number;
  private maxPriceOpt: number;
  private minStockOpt: number;
  private maxStockOpt: number;
  private searchString: string;
  private mode: string;

  constructor(sort: string, genre: string[], publisher: string[], minPrice: number, maxPrice: number,
    minStock: number, maxStock: number, searchString: string, mode: string) {
    this.sort = sort;
    this.genre = genre;
    this.publisher = publisher;
    this.minPriceOpt = minPrice;
    this.maxPriceOpt = maxPrice;
    this.minStockOpt = minStock;
    this.maxStockOpt = maxStock;
    this.searchString = searchString;
    this.mode = mode;
  }

  renderFilters(chosenBooks: book[]): HTMLElement {
    const section: HTMLElement = createElementWithOptions('section', HTMLElement, {className: 'filters'});
    const baseDiv: HTMLDivElement = createElementWithOptions('div', HTMLDivElement, {className: 'container filters__container'});
    const fWrapper: HTMLDivElement = createElementWithOptions('div', HTMLDivElement, {className: 'filters__wrapper'});
    const filterGenre: HTMLDivElement = createElementWithOptions('div', HTMLDivElement, {className: 'filters__genre'});
    const filterGenreTitle: HTMLHeadingElement = createElementWithOptions('h3', HTMLHeadingElement, {className: 'filters__genre-title', textContent: 'Genre'});
    const filterPublisher: HTMLDivElement = createElementWithOptions('div', HTMLDivElement, {className: 'filters__publisher'});
    const filterPublisherTitle: HTMLHeadingElement = createElementWithOptions('h3', HTMLHeadingElement, {className: 'filters__publishers-title', textContent: 'Publisher'});
    const fSliders: HTMLDivElement = createElementWithOptions('div', HTMLDivElement, {className: 'filters__sliders'});
    const fPrice: HTMLDivElement = createElementWithOptions('div', HTMLDivElement, {className: 'filters__price'});
    const fPriceTitle: HTMLHeadingElement = createElementWithOptions('h3', HTMLHeadingElement, {className: 'filters__price-title', textContent: 'Price'});
    const minPriceHTMLMax: HTMLDivElement = createElementWithOptions('div', HTMLDivElement, {className: 'filters__price-minmax'});
    const minPriceHTML: HTMLParagraphElement = createElementWithOptions('p', HTMLParagraphElement, {className: 'filters__price-min', textContent: '0'});
    const maxPriceHTML: HTMLParagraphElement = createElementWithOptions('p', HTMLParagraphElement, {className: 'filters__price-max', textContent: '0'});
    const sliderPrice: HTMLDivElement = createElementWithOptions('div', HTMLDivElement, {className: 'slider-price'});
    const fStock: HTMLDivElement = createElementWithOptions('div', HTMLDivElement, {className: 'filters__stock'});
    const fStockTitle: HTMLHeadingElement = createElementWithOptions('h3', HTMLHeadingElement, {className: 'filters__stock-title', textContent: 'Stock'});
    const minStockHTMLMax: HTMLDivElement = createElementWithOptions('div', HTMLDivElement, {className: 'filters__stock-minmax'});
    const minStockHTML: HTMLParagraphElement = createElementWithOptions('p', HTMLParagraphElement, {className: 'filters__stock-min', textContent: '0'});
    const maxStockHTML: HTMLParagraphElement = createElementWithOptions('p', HTMLParagraphElement, {className: 'filters__stock-max', textContent: '0'});
    const sliderStock: HTMLDivElement = createElementWithOptions('div', HTMLDivElement, {className: 'slider-stock'});
    const SWrapper: HTMLDivElement = createElementWithOptions('div', HTMLDivElement, {className: 'filters__wrapper'});
    const fSort: HTMLSelectElement = createElementWithOptions('select', HTMLSelectElement, {className: 'sort'});
    const fReset: HTMLButtonElement = createElementWithOptions('button', HTMLButtonElement, {className: 'filters__filter-reset', textContent: 'Reset Filters'});
    const fCopy: HTMLButtonElement = createElementWithOptions('button', HTMLButtonElement, {className: 'filters__filter-copy', textContent: 'Copy link'});
    const fSearch: HTMLDivElement = createElementWithOptions('div', HTMLDivElement, {className: 'filters__search'});
    const fSearchForm: HTMLFormElement = createElementWithOptions('form', HTMLFormElement, {className: 'filters__search-form'});
    const fsearchInput: HTMLInputElement = createElementWithOptions('input', HTMLInputElement, {className: 'filters__search-input'});
    const infoWrapper: HTMLDivElement = createElementWithOptions('div', HTMLDivElement, {className: 'filters__wrapper'});
    const infoFound: HTMLHeadingElement = createElementWithOptions('h3', HTMLHeadingElement, {className: 'filters__found', textContent: `Found: ${chosenBooks.length}`});
    const infoDisplay: HTMLDivElement = createElementWithOptions('div', HTMLDivElement, {className: 'filters__display'});

    infoDisplay.textContent = this.mode === 'mini' ? 'Big' : 'Mini';

    infoDisplay.addEventListener('click', () => {
      if (this.mode === 'mini') {
        infoDisplay.textContent = 'Mini';
        this.mode = 'big';
      } else {
        infoDisplay.textContent = 'Big';
        this.mode = 'mini';
      }
      mainOptions.set(keysMain.Mode, this.mode.toString());
      window.location.hash = getMainAddress();
    })

    fsearchInput.type = 'text';
    fsearchInput.placeholder = 'Search for books by keyword';
    if (this.searchString) {
      fsearchInput.value = this.searchString;
    }
    const fsearchSubmit: HTMLInputElement = createElementWithOptions('input', HTMLInputElement, {className: 'filters__search-submit'});
    fsearchSubmit.type = 'submit';
    fsearchSubmit.value = '';
    section.appendChild(baseDiv);
    baseDiv.appendChild(fWrapper);
    fWrapper.appendChild(filterGenre);
    filterGenre.appendChild(filterGenreTitle);
    fWrapper.appendChild(filterPublisher);
    filterPublisher.appendChild(filterPublisherTitle);
    fWrapper.appendChild(fSliders);
    fSliders.appendChild(fPrice);
    fPrice.appendChild(fPriceTitle);
    fPrice.appendChild(minPriceHTMLMax);
    minPriceHTMLMax.appendChild(minPriceHTML);
    minPriceHTMLMax.appendChild(maxPriceHTML);
    fPrice.appendChild(sliderPrice);
    fSliders.appendChild(fStock);
    fStock.appendChild(fStockTitle);
    fStock.appendChild(minStockHTMLMax);
    minStockHTMLMax.appendChild(minStockHTML);
    minStockHTMLMax.appendChild(maxStockHTML);
    fStock.appendChild(sliderStock);
    baseDiv.appendChild(SWrapper);
    SWrapper.appendChild(fSort);
    SWrapper.appendChild(fReset);
    SWrapper.appendChild(fCopy);
    baseDiv.appendChild(fSearch);
    fSearch.appendChild(fSearchForm);
    fSearchForm.appendChild(fsearchInput);
    fSearchForm.appendChild(fsearchSubmit);

    infoWrapper.append(infoFound, infoDisplay);
    baseDiv.append(infoWrapper);

    for (let i = 0; i < SortOptions.length; i++) {
      const element = SortOptions[i];
      const opt = new Option(element.name, element.id);
      if (element.id === this.sort) {
        opt.selected = true;
      }
      fSort.appendChild(opt);
    }

    fCopy.onclick = function(): void {
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(function() {
        fCopy.textContent = 'URL copied!';
        setTimeout(() => {
          fCopy.textContent = 'Copy link';
        }, 1500);
    }, function() {
        throw new Error('URL copy error');
    });
    }

    fReset.onclick = function(): void {
      resetMainOptions();
      window.location.hash = getMainAddress();
    }

    const genreCheckboxList: HTMLUListElement = createElementWithOptions('ul', HTMLUListElement, {className: 'filters__genre-list'});
    const publisherCheckboxList: HTMLUListElement = createElementWithOptions('ul', HTMLUListElement, {className: 'filters__publisher-list'});
    const arrGenres: string[] = [];
    const arrAuthors: string[] = [];
    const prices: number[] = [];
    const stocks: number[] = [];
    const pricesCur: number[] = [];
    const stocksCur: number[] = [];

    for (let i = 0; i < chosenBooks.length; i++) {
      const book = chosenBooks[i];
      pricesCur.push(book.price);
      stocksCur.push(book.stock_balance);
    }

    for (const book of books) {
      prices.push(book.price);
      stocks.push(book.stock_balance);
      if (!arrGenres.includes(book.genre)) {
        arrGenres.push(book.genre);
        const genreCheckboxItem: HTMLLIElement = createElementWithOptions('li', HTMLLIElement, {className: 'filters__genre-item'});
        const genreCheckboxInput: HTMLInputElement = createElementWithOptions('input', HTMLInputElement, {type: 'checkbox', id: book.genre.replace(/ /g, '')});
        const allCount = books.filter((val) => val.genre === book.genre).length;
        const curCount = chosenBooks.filter((val) => val.genre === book.genre).length;
        const genreCheckboxLabel: HTMLLabelElement = createElementWithOptions('label', HTMLLabelElement, {innerText: `${book.genre} (${curCount}/${allCount})`});
        if (!curCount) {
          genreCheckboxLabel.classList.add('inactive');
        }
        genreCheckboxItem.append(genreCheckboxInput, genreCheckboxLabel);
        genreCheckboxLabel.setAttribute('for', book.genre.replace(/ /g, ''));
        genreCheckboxList.append(genreCheckboxItem);

        if (this.genre.includes(genreCheckboxInput.id)) {
          genreCheckboxInput.checked = true;
        }

        genreCheckboxItem.addEventListener('change', () => {
          if (genreCheckboxInput.checked) {
            this.genre.push(genreCheckboxInput.id);
          } else {
            this.genre = this.genre.filter((val) => val !== genreCheckboxInput.id);
          }
          if (this.genre.length !== 0) {
            mainOptions.set(keysMain.Genre, this.genre.join(delimeter));
          } else {
            mainOptions.delete(keysMain.Genre);
          }
          window.location.hash = getMainAddress();
        })
      }
      if (!arrAuthors.includes(book.publisher)) {
        arrAuthors.push(book.publisher);
        const allCount = books.filter((val) => val.publisher === book.publisher).length;
        const curCount = chosenBooks.filter((val) => val.publisher === book.publisher).length;
        const publisherCheckboxItem: HTMLLIElement = createElementWithOptions('li', HTMLLIElement, {className : 'filters__publisher-item'});
        const publisherCheckboxInput: HTMLInputElement = createElementWithOptions('input', HTMLInputElement, {type : 'checkbox', id : book.publisher.replace(reg, '')});
        const publisherCheckboxLabel: HTMLLabelElement = createElementWithOptions('label', HTMLLabelElement, {innerText : `${book.publisher} (${curCount}/${allCount})`});
        publisherCheckboxItem.append(publisherCheckboxInput, publisherCheckboxLabel);
        if (!curCount) {
          publisherCheckboxLabel.classList.add('inactive');
        }
        publisherCheckboxLabel.setAttribute('for', book.publisher.replace(reg, ''));
        publisherCheckboxList.append(publisherCheckboxItem);

        if (this.publisher.includes(publisherCheckboxInput.id)) {
          publisherCheckboxInput.checked = true;
        }

        publisherCheckboxInput.addEventListener('click', () => {
          if (publisherCheckboxInput.checked) {
            this.publisher.push(publisherCheckboxInput.id);
          } else {
            this.publisher = this.publisher.filter((val) => val !== publisherCheckboxInput.id);
          }
          if (this.publisher.length !== 0) {
            mainOptions.set(keysMain.Publisher, this.publisher.join(delimeter));
          } else {
            mainOptions.delete(keysMain.Publisher);
          }
          window.location.hash = getMainAddress();
        })
      }
    }
    filterGenre.append(genreCheckboxList);
    filterPublisher.append(publisherCheckboxList);

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const minPriceCur = Math.min(...pricesCur);
    const maxPriceCur = Math.max(...pricesCur);
    const curMinPrice = this.minPriceOpt ? this.minPriceOpt : minPriceCur;
    const curMaxPrice = this.maxPriceOpt ? this.maxPriceOpt : maxPriceCur;
    minPriceHTML.innerText = String(curMinPrice);
    maxPriceHTML.innerText = String(curMaxPrice);
    noUiSlider.create(sliderPrice, {
      start: [curMinPrice, curMaxPrice],
      connect: true,
      range: {
        'min': minPrice,
        'max': maxPrice
      },
      step: 1,
    });

    const priceLeftHandle: HTMLDivElement = getElementBySelector(sliderPrice, HTMLDivElement, '.noUi-handle-lower');
    const priceRightHandle: HTMLDivElement = getElementBySelector(sliderPrice, HTMLDivElement, '.noUi-handle-upper');

    sliderPrice.addEventListener('click', () => {
      const curMinPrice: number = priceLeftHandle.ariaValueNow ? +priceLeftHandle.ariaValueNow.slice(0, -2) : minPrice;
      const curMaxPrice: number = priceRightHandle.ariaValueNow ? +priceRightHandle.ariaValueNow.slice(0, -2) : maxPrice;
      curMinPrice === minPrice ? mainOptions.delete(keysMain.MinPrice) : mainOptions.set(keysMain.MinPrice, curMinPrice.toString());
      curMaxPrice === maxPrice ? mainOptions.delete(keysMain.MaxPrice) : mainOptions.set(keysMain.MaxPrice, curMaxPrice.toString());
      window.location.hash = getMainAddress();
      }
    );

    const minStock = Math.min(...stocks);
    const maxStock = Math.max(...stocks);
    const minStockCur = Math.min(...stocksCur);
    const maxStockCur = Math.max(...stocksCur);
    const curMinStock = this.minStockOpt ? this.minStockOpt : minStockCur;
    const curMaxStock = this.maxStockOpt ? this.maxStockOpt : maxStockCur;
    minStockHTML.innerText = String(curMinStock);
    maxStockHTML.innerText = String(curMaxStock);
    noUiSlider.create(sliderStock, {
      start: [curMinStock, curMaxStock],
      connect: true,
      range: {
        'min': minStock,
        'max': maxStock,
      },
      step: 1,
    });

    const stockLeftHandle: HTMLDivElement = getElementBySelector(sliderStock, HTMLDivElement, '.noUi-handle-lower');
    const stockRightHandle: HTMLDivElement = getElementBySelector(sliderStock, HTMLDivElement, '.noUi-handle-upper');

    sliderStock.addEventListener('click', () => {
      const curMinStock: number = stockLeftHandle.ariaValueNow ? +stockLeftHandle.ariaValueNow.slice(0, -2) : minStock;
      const curMaxStock: number = stockRightHandle.ariaValueNow ? +stockRightHandle.ariaValueNow.slice(0, -2) : maxStock;
      curMinStock === minStock ? mainOptions.delete(keysMain.MinStock) : mainOptions.set(keysMain.MinStock, curMinStock.toString());
      curMaxStock === maxStock ? mainOptions.delete(keysMain.MaxStock) : mainOptions.set(keysMain.MaxStock, curMaxStock.toString());
      window.location.hash = getMainAddress();
      }
    );

    fSort.addEventListener('change', () => {
      console.log('Chosen sort option: ', fSort.value);
      if (fSort.value === SortOptions[0].id) {
        mainOptions.delete(keysMain.Sort);
      } else {
        mainOptions.set(keysMain.Sort, fSort.value);
      }
      setMainOptions();
      window.location.hash = getMainAddress();
    })

    function makeStringSearch(): void {
      const searchString = fsearchInput.value;
      if (searchString.length === 0) {
        mainOptions.delete(keysMain.Search);
      } else {
        mainOptions.set(keysMain.Search, searchString);
        window.location.hash = getMainAddress();
      }
    }

    fSearchForm.addEventListener('submit', makeStringSearch);

    return section;
  }
}

export default Filters;