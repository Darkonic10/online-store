import Page from "../../core/page";
import Filters from "./filters/filters";
import Content from "./content/content";
import { books } from "../../data/books";

class MainPage extends Page{
  protected filters: Filters;
  protected content: Content;

  constructor(id: string) {
    super(id)
    this.filters = new Filters();
    this.content = new Content();
  }

  private createMain(): HTMLElement {
    const section: HTMLElement = this.filters.renderFilters();
    this.container.appendChild(section);
  
    const content: HTMLDivElement = this.content.renderContent(books);
    this.container.append(content);
    return this.container;
  }

  render(): HTMLElement {
    return this.createMain();
  }
}

export default MainPage;