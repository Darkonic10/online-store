import Page from "../../core/page";

class BookPage extends Page{
  static TextObject = {
    MainTitle: 'BookPage',
  };

  constructor(id: string) {
    super(id);
  }

  render(): HTMLElement {
    const title = this.createHeaderTitle(BookPage.TextObject.MainTitle);
    this.container.append(title);
    return this.container;
  }
}

export default BookPage;