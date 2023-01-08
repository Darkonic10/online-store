import { getBookID, getElementBySelector, getHash, getMainOptions, getOptions, setMainOptions } from "../../types/checks";
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
      if(options && options.size !== 0) {
        const itemsPage = options.get('limit');
        const pageOptions = options.get('page');
        if(typeof itemsPage !== 'undefined' && typeof pageOptions !== 'undefined') {
          page = new BasketPage(idPage, +itemsPage, +pageOptions);
        } else if(typeof itemsPage !== 'undefined' && typeof pageOptions === 'undefined') {
          page = new BasketPage(idPage, +itemsPage, 1);
        } else if(typeof itemsPage === 'undefined' && typeof pageOptions !== 'undefined') {
          page = new BasketPage(idPage, 3, +pageOptions);
        } else if(typeof itemsPage === 'undefined' && typeof pageOptions === 'undefined') {
          page = new BasketPage(idPage, 3, 1);
        } else {
          page = new ErrorPage(idPage, ErrorTypes.Error_404);
        }
      } else {
        page = new BasketPage(idPage, 3, 1);
      }
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
    window.addEventListener('beforeunload', setMainOptions);
    window.addEventListener('load', getMainOptions);
    this.changedHash();
  }
}

export default App