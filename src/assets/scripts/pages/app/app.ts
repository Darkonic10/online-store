import { getBookID, getElementBySelector, getHash, getOptions } from "../../types/checks";
import MainPage from "../main/main";
import Page from "../../core/page";
import BasketPage from "../basket/basket";
import BookPage from "../book/book";
import { ErrorTypes, PageIds } from "../../types/enums";
import ErrorPage from "../page404/page404";
import { Options } from "../../types/Interfaces";

class App {
  private static container: HTMLElement = getElementBySelector(document, HTMLElement, 'main');
  private static defaultPageID = 'current-page';
  
  static renderNewPage(idPage: string, options?: Options): void {
    const currentPage = document.querySelector(`#${this.defaultPageID}`);
    if (currentPage) {
      currentPage.remove();
    }

    let page: Page | null = null;
    if (idPage === PageIds.MainPage) {
      page = new MainPage(idPage);
    } else if (idPage === PageIds.BasketPage) {
      page = new BasketPage(idPage);
    } else if (idPage === PageIds.BookPage) {
      if (options) {
        const idBook = getBookID(options);
        if (idBook > 0) {
          page = new BookPage(idPage, idBook);
        } else {
          page = new ErrorPage(idPage, ErrorTypes.Error_404);
        }
      } else {
        page = new ErrorPage(idPage, ErrorTypes.Error_404);
      }
    } else {
      page = new ErrorPage(idPage, ErrorTypes.Error_404);
    }

    if (page) {
      const pageHTML: HTMLElement = page.render();
      pageHTML.id = this.defaultPageID;
      this.container.append(pageHTML);
    }
  }

  private changedHash(): void {
    function getPageHash() {
      const hash = window.location.hash;
      const address = getHash(hash);
      const options = getOptions(hash.slice(hash.indexOf('?') + 1));
      if (!hash) {
        App.renderNewPage(PageIds.MainPage);
      } else {
        App.renderNewPage(address, options);
      }
    }
    window.addEventListener('hashchange', getPageHash);
    window.addEventListener('load', getPageHash);
  }

  run() {
    this.changedHash();
  }
}

export default App