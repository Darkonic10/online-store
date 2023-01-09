import { books } from "../../../data/books";
import { createElementByTag, getMainAddress, mainOptions, resetMainOptions, setMainOptions } from "../../../types/checks";
import noUiSlider from "nouislider";
import { delimeter, keyToMainOptions, reg, SortOptions } from "../../../types/enums";

class Filters {
  private sort: string;
  private genre: string[];
  private publisher: string[];

  constructor(sort: string, genre: string[], publisher: string[]){
    this.sort = sort;
    this.genre = genre;
    this.publisher = publisher;
  }

  renderFilters(): HTMLElement {
    const section: HTMLElement = document.createElement('section');
    section.className = 'filters';
    const baseDiv: HTMLDivElement = createElementByTag('div', 'container filters__container', HTMLDivElement);
    const fWrapper: HTMLDivElement = createElementByTag('div', 'filters__wrapper', HTMLDivElement);
    const filterGenre: HTMLDivElement = createElementByTag('div', 'filters__genre', HTMLDivElement);
    const filterGenreTitle: HTMLHeadingElement = createElementByTag('h3', 'filters__genre-title', HTMLHeadingElement, 'Genre');
    const filterPublisher: HTMLDivElement = createElementByTag('div', 'filters__publisher', HTMLDivElement);
    const filterPublisherTitle: HTMLHeadingElement = createElementByTag('h3', 'filters__publishers-title', HTMLHeadingElement, 'Publisher');
    const fSliders: HTMLDivElement = createElementByTag('div', 'filters__sliders', HTMLDivElement);
    const fPrice: HTMLDivElement = createElementByTag('div', 'filters__price', HTMLDivElement);
    const fPriceTitle: HTMLHeadingElement = createElementByTag('h3', 'filters__price-title', HTMLHeadingElement, 'Price');
    const minPriceHTMLMax: HTMLDivElement = createElementByTag('div', 'filters__price-minmax', HTMLDivElement)
    const minPriceHTML: HTMLParagraphElement = createElementByTag('p', 'filters__price-min', HTMLParagraphElement, '0');
    const maxPriceHTML: HTMLParagraphElement = createElementByTag('p', 'filters__price-max', HTMLParagraphElement, '0');
    const sliderPrice: HTMLDivElement = createElementByTag('div', 'slider-price', HTMLDivElement);
    const fStock: HTMLDivElement = createElementByTag('div', 'filters__stock', HTMLDivElement);
    const fStockTitle: HTMLHeadingElement = createElementByTag('h3', 'filters__stock-title', HTMLHeadingElement, 'Stock');
    const minStockHTMLMax: HTMLDivElement = createElementByTag('div', 'filters__stock-minmax', HTMLDivElement)
    const minStockHTML: HTMLParagraphElement = createElementByTag('p', 'filters__stock-min', HTMLParagraphElement, '0');
    const maxStockHTML: HTMLParagraphElement = createElementByTag('p', 'filters__stock-max', HTMLParagraphElement, '0');
    const sliderStock: HTMLDivElement = createElementByTag('div', 'slider-stock', HTMLDivElement);
    const SWrapper: HTMLDivElement = createElementByTag('div', 'filters__wrapper', HTMLDivElement);
    const fSort: HTMLSelectElement = createElementByTag('select', 'sort', HTMLSelectElement);
    const fReset: HTMLButtonElement = createElementByTag('button', 'filters__filter-reset', HTMLButtonElement, 'Reset Filters');
    const fCopy: HTMLButtonElement = createElementByTag('button', 'filters__filter-copy', HTMLButtonElement, 'Copy link');
    const fSearch: HTMLDivElement = createElementByTag('div', 'filters__search', HTMLDivElement);
    const fSearchFrom: HTMLFormElement = createElementByTag('form', 'filters__search-form', HTMLFormElement);
    const fsearchInput: HTMLInputElement = createElementByTag('input', 'filters__search-input', HTMLInputElement);
    fsearchInput.type = 'search'
    fsearchInput.name = 'q';
    fsearchInput.placeholder = 'Search for books by keyword';
    const fsearchSubmit: HTMLInputElement = createElementByTag('input', 'filters__search-submit', HTMLInputElement);
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
    fSearch.appendChild(fSearchFrom);
    fSearchFrom.appendChild(fsearchInput);
    fSearchFrom.appendChild(fsearchSubmit);

    for (let i = 0; i < SortOptions.length; i++) {
      const element = SortOptions[i];
      const opt = new Option(element.name, element.id);
      if (element.id === this.sort) {
        opt.selected = true;
      }
      fSort.appendChild(opt);
    }

    fCopy.onclick = function(){
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(function() {
        console.log('URL copied!');
    }, function() {
        console.log('URL copy error')
    });
    }

    fReset.onclick = function(){
      resetMainOptions();
      window.location.hash = getMainAddress();
    }

    const genreCheckboxList: HTMLUListElement = document.createElement('ul');
    genreCheckboxList.className = 'filters__genre-list';
    const publisherCheckboxList: HTMLUListElement = document.createElement('ul');
    publisherCheckboxList.className = 'filters__publisher-list';
    const arrGenres: string[] = [];
    const arrAuthors: string[] = [];
    const prices: number[] = [];
    const stocks: number[] = [];

    for (const book of books) {
      prices.push(book.price);
      stocks.push(book.stock_balance);
      if (!arrGenres.includes(book.genre)) {
        arrGenres.push(book.genre);
        const genreCheckboxItem: HTMLLIElement = document.createElement('li');
        const genreCheckboxInput: HTMLInputElement = document.createElement('input');
        const genreCheckboxLabel: HTMLLabelElement = document.createElement('label');
        genreCheckboxItem.className = 'filters__genre-item'
        genreCheckboxItem.append(genreCheckboxInput, genreCheckboxLabel);
        genreCheckboxInput.type = 'checkbox';
        genreCheckboxInput.id = book.genre.replace(/ /g, '');
        genreCheckboxLabel.innerText = `${book.genre}`;
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
            mainOptions.set(keyToMainOptions.Genre, this.genre.join(delimeter));
          } else {
            mainOptions.delete(keyToMainOptions.Genre);
          }
          window.location.hash = getMainAddress();
        })
      }
      if (!arrAuthors.includes(book.publisher)) {
        arrAuthors.push(book.publisher);
        const publisherCheckboxItem: HTMLLIElement = document.createElement('li');
        const publisherCheckboxInput: HTMLInputElement = document.createElement('input');
        const publisherCheckboxLabel: HTMLLabelElement = document.createElement('label');
        publisherCheckboxItem.className = 'filters__publisher-item'
        publisherCheckboxItem.append(publisherCheckboxInput, publisherCheckboxLabel);
        publisherCheckboxInput.type = 'checkbox';
        publisherCheckboxInput.id = book.publisher.replace(reg, '');
        publisherCheckboxLabel.innerText = `${book.publisher}`;
        publisherCheckboxLabel.setAttribute('for', book.publisher.replace(reg, ''));
        publisherCheckboxList.append(publisherCheckboxItem);

        console.log(this.publisher.includes(publisherCheckboxInput.id));
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
            mainOptions.set(keyToMainOptions.Publisher, this.publisher.join(delimeter));
          } else {
            mainOptions.delete(keyToMainOptions.Publisher);
          }
          window.location.hash = getMainAddress();
        })
      }
    }
    filterGenre.append(genreCheckboxList);
    filterPublisher.append(publisherCheckboxList)

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
      },
      margin: 1,
    })
    const minStock = Math.min(...stocks);
    const maxStock = Math.max(...stocks);
    minStockHTML.innerText = String(minStock);
    maxStockHTML.innerText = String(maxStock);
    noUiSlider.create(sliderStock, {
      start: [0, 100],
      connect: true,
      range: {
        'min': minStock,
        'max': maxStock
      },
      margin: 1,
    })

    fSort.addEventListener('change', () => {
      console.log('Chosen sort option: ', fSort.value);
      if (fSort.value === SortOptions[0].id) {
        mainOptions.delete(keyToMainOptions.Sort);
      } else {
        mainOptions.set(keyToMainOptions.Sort, fSort.value);
      }
      setMainOptions();
      window.location.hash = getMainAddress();
    })

    return section;
  }
}

export default Filters;