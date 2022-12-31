import {getElementBySelector} from "../../types/checks";
import MainPage from "../main/main";
import Page from "../../core/page";
import BasketPage from "../basket/basket";
import BookPage from "../book/book";
import Header from "../../core/nav";
import { ErrorTypes, PageIds } from "../../types/enums";
import ErrorPage from "../page404/page404";

class App {
  private static container: HTMLElement = getElementBySelector(document, HTMLElement, 'main');
  private static defaultPageID = 'current-page';
  private initialPage: MainPage;
  private header: Header;

  constructor() {
    this.header = new Header('div', 'header-container-new');
    this.initialPage = new MainPage(PageIds.MainPage);
  }
  
  static renderNewPage(idPage: string): void {
    const currentPage = document.querySelector(`#${this.defaultPageID}`);
    if (currentPage) {
      currentPage.remove();
    }

    let page: Page | null = null;
    if(idPage === PageIds.MainPage) {
      page = new MainPage(idPage);
    } else if(idPage === PageIds.BasketPage) {
      page = new BasketPage(idPage);
    } else if(idPage === PageIds.BookPage) {
      page = new BookPage(idPage);
    } else {
      page = new ErrorPage(idPage, ErrorTypes.Error_404);
    }

    if(page) {
      const pageHTML: HTMLElement = page.render();
      pageHTML.id = this.defaultPageID;
      this.container.append(pageHTML);
    }
  }

  private changedHash() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
    window.addEventListener('load', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
  }

  run() {
    App.container.append(this.header.render());
    App.renderNewPage(PageIds.MainPage);
    this.changedHash();
  }
}

export default App