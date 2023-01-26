import Page from "../../core/page";
import Filters from "./filters/filters";
import Content from "./content/content";
import { books } from "../../data/books";
import { book } from "../../types/Interfaces";
import { delimeter, keysMain, reg, SortOptions } from "../../types/enums";
import { mainOptions } from "../../types/checks";

class MainPage extends Page {
  protected filters: Filters;
  protected content: Content;
  private sort: string = SortOptions[0].id;
  private genre: string[] = [];
  private publisher: string[] = [];
  private minPrice = 0;
  private maxPrice = 0;
  private minStock = 0;
  private maxStock = 0;
  private searchWords: string[] = [];
  private searchString = '';
  private mode = 'big';
  protected chosenBooks: book[] = [...books];

  constructor(id: string) {
    super(id);
    if (mainOptions) {
      const sortFromLocal = mainOptions.get(keysMain.Sort);
      if (sortFromLocal) {
        this.sort = sortFromLocal;
        switch (this.sort) {
          case SortOptions[1].id:
            this.chosenBooks.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1);
            break;
            
          case SortOptions[2].id:
            this.chosenBooks.sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1);
            break;

          case SortOptions[3].id:
            this.chosenBooks.sort((a, b) => a.author.toLowerCase() > b.author.toLowerCase() ? 1 : -1);
            break;
          
          case SortOptions[4].id:
            this.chosenBooks.sort((a, b) => a.author.toLowerCase() < b.author.toLowerCase() ? 1 : -1);
            break;

          case SortOptions[5].id:
            this.chosenBooks.sort((a, b) => a.price - b.price);
            break;
            
          case SortOptions[6].id:
            this.chosenBooks.sort((a, b) => b.price - a.price);
            break;

          default:
            break;
        }
      }
      const genreFromLocal = mainOptions.get(keysMain.Genre);
      if (genreFromLocal) {
        this.genre = genreFromLocal.split(delimeter);
        this.chosenBooks = this.chosenBooks.filter((val) => this.genre.includes(val.genre.replace(/ /g, '')));
      }
      const publisherFromLocal = mainOptions.get(keysMain.Publisher);
      if (publisherFromLocal) {
        this.publisher = publisherFromLocal.split(delimeter);
        this.chosenBooks = this.chosenBooks.filter((val) => this.publisher.includes(val.publisher.replace(reg, '')));
      }
      const minPricefromLocal = mainOptions.get(keysMain.MinPrice);
      if (minPricefromLocal) {
        this.minPrice = parseInt(minPricefromLocal);
        this.chosenBooks = this.chosenBooks.filter((val) => val.price >= this.minPrice);
      }
      const maxPricefromLocal = mainOptions.get(keysMain.MaxPrice);
      if (maxPricefromLocal) {
        this.maxPrice = parseInt(maxPricefromLocal);
        this.chosenBooks = this.chosenBooks.filter((val) => val.price <= this.maxPrice);
      }
      const minStockfromLocal = mainOptions.get(keysMain.MinStock);
      if (minStockfromLocal) {
        this.minStock = parseInt(minStockfromLocal);
        this.chosenBooks = this.chosenBooks.filter((val) => val.stock_balance >= this.minStock);
      }
      const maxStockfromLocal = mainOptions.get(keysMain.MaxStock);
      if (maxStockfromLocal) {
        this.maxStock = parseInt(maxStockfromLocal);
        this.chosenBooks = this.chosenBooks.filter((val) => val.stock_balance <= this.maxStock);
      }
      const searchfromLocal = mainOptions.get(keysMain.Search);
      if (searchfromLocal) {
        this.searchString = searchfromLocal;
        this.searchWords = searchfromLocal.toLowerCase().split(' ').filter((val) => val);
        const chosenId: number[] = [];
        for (let i = 0; i < this.chosenBooks.length; i++) {
          const element: book = this.chosenBooks[i];
          let isOkay = true;
          let iter = 0;
          const unitedString = `${element.author} ${element.description} ${element.genre} ${element.price} ${element.publisher} ${element.stock_balance} ${element.title}`.toLowerCase();
          while (isOkay && iter < this.searchWords.length) {
            if (!unitedString.includes(this.searchWords[iter])) {
              isOkay = false;
            }
            iter++;
          }
          if (isOkay) {
            chosenId.push(element.id);
          }
        }
        this.chosenBooks = this.chosenBooks.filter((val) => chosenId.includes(val.id));
      }
      const modefromLocal = mainOptions.get(keysMain.Mode);
      if (modefromLocal) {
        this.mode = modefromLocal;
      }
    }
    this.filters = new Filters(this.sort, this.genre, this.publisher, this.minPrice, this.maxPrice,
      this.minStock, this.maxStock, this.searchString, this.mode);
    this.content = new Content();
  }

  private createMain(): HTMLElement {
    const section: HTMLElement = this.filters.renderFilters(this.chosenBooks);
    const content: HTMLDivElement = this.content.renderContent(this.chosenBooks, this.mode);
    this.container.append(section, content);
    return this.container;
  }

  render(): HTMLElement {
    return this.createMain();
  }
}

export default MainPage;