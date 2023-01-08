import Page from "../../core/page";
import Filters from "./filters/filters";
import Content from "./content/content";
import { books } from "../../data/books";
import { book } from "../../types/Interfaces";
import { SortOptions } from "../../types/enums";
import { mainOptions } from "../../types/checks";

class MainPage extends Page {
  protected filters: Filters;
  protected content: Content;
  private sort: string;
  protected chosenBooks: book[];

  constructor(id: string) {
    super(id);
    this.chosenBooks = [...books];
    this.sort = SortOptions[0].id;
    if (mainOptions) {
      const sortFromLocal = mainOptions.get('sort');
      if (sortFromLocal) {
        this.sort = sortFromLocal;
        switch (this.sort) {
          case SortOptions[1].id:
            this.chosenBooks.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1)
            break;
            
          case SortOptions[2].id:
            this.chosenBooks.sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? 1 : -1)
            break;

          case SortOptions[3].id:
            this.chosenBooks.sort((a, b) => a.author.toLowerCase() > b.author.toLowerCase() ? 1 : -1)
            break;
          
          case SortOptions[4].id:
            this.chosenBooks.sort((a, b) => a.author.toLowerCase() < b.author.toLowerCase() ? 1 : -1)
            break;

          case SortOptions[5].id:
            this.chosenBooks.sort((a, b) => a.price - b.price)
            break;
            
          case SortOptions[6].id:
            this.chosenBooks.sort((a, b) => b.price - a.price)
            break;
        }
      }
    }
    this.filters = new Filters(this.sort);
    this.content = new Content();
  }

  private createMain(): HTMLElement {
    const section: HTMLElement = this.filters.renderFilters();
    this.container.appendChild(section);
  
    const content: HTMLDivElement = this.content.renderContent(this.chosenBooks);
    this.container.append(content);
    return this.container;
  }

  render(): HTMLElement {
    return this.createMain();
  }
}

export default MainPage;