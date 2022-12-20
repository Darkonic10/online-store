import {getElementBySelector} from "../../types/Interfaces";
import MainPage from "../main";

class App {
  private container: HTMLElement;
  private containerFilters: HTMLElement;
  private initialPage: MainPage;

  renderNewPage(id: string): void {
    this.container.innerHTML = '';
    this.containerFilters.innerHTML = '';
  }

  constructor() {
    this.container = getElementBySelector(document, HTMLDivElement, '.main__container');
    this.containerFilters = getElementBySelector(document, HTMLDivElement, '.filters__container');
    this.initialPage = new MainPage('main-page');
  }

  run() {
    this.initialPage?.render();
  }
}

export default App