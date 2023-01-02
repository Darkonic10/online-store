import { getElementBySelector, getHash } from "../../types/checks";
import MainPage from "../main/main";
import Page from "../../core/page";
import BasketPage from "../basket/basket";
import BookPage from "../book/book";
import { ErrorTypes, PageIds } from "../../types/enums";
import ErrorPage from "../page404/page404";

class App {
  private static container: HTMLElement = getElementBySelector(document, HTMLElement, 'main');
  private static defaultPageID = 'current-page';
  
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
    function getPageHash () {
      const hash = getHash(window.location.hash);
      if (!hash) {
        App.renderNewPage(PageIds.MainPage);
      } else {
        App.renderNewPage(hash);
      }
    }
    window.addEventListener('hashchange', getPageHash);
    window.addEventListener('load', getPageHash);
  }

  run() {
    // App.container.append(this.header.render());
    App.renderNewPage(PageIds.MainPage);
    this.changedHash();
  }
}

export default App