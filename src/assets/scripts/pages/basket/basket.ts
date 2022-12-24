import Page from "../../core/page";

class BasketPage extends Page{
  static TextObject = {
    MainTitle: 'BasketPage',
  };

  constructor(id: string) {
    super(id);
  }

  render(): HTMLElement {
    const title = this.createHeaderTitle(BasketPage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}

export default BasketPage;