import {getElementBySelector} from "../../types/Interfaces";
import MainPage from "../main";
import Page from "../../core/page";
import BasketPage from "../basket";
import BookPage from "../book";

export const enum PageIds {
  MainPage = 'main-page',
  BasketPage = 'basket-page',
  BookPage = 'book-page'
}

class App {
  private static container: HTMLElement = getElementBySelector(document, HTMLElement, '.main');
  private static containerFilters: HTMLElement = getElementBySelector(document, HTMLElement, '.filters');

  static renderNewPage(idPage: string): void {
    this.container.innerHTML = '';
    this.containerFilters.innerHTML = '';

    let page: Page | null = null;
    if(idPage === PageIds.MainPage) {
      page = new MainPage(idPage)
    } else if(idPage === PageIds.BasketPage) {
      page = new BasketPage(idPage);
    } else if(idPage === PageIds.BookPage) {
      page = new BookPage(idPage)
    }

    if(page) {
      const mainPageFilters: HTMLElement = page.renderFilters();
      const mainPageHTML: HTMLElement = page.render();
      this.containerFilters.append(mainPageFilters);
      this.container.append(mainPageHTML);
    }
  }

  private changedHash() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
  }

  run() {
    App.renderNewPage(PageIds.MainPage);
    this.changedHash();
  }
}

export default App