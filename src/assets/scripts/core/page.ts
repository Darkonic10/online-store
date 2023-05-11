abstract class Page {
  protected container: HTMLDivElement;

  protected constructor(id: string) {
    this.container = document.createElement('div');
    this.container.id = id;
  }

  protected createHeaderTitle(text: string): HTMLHeadingElement {
    const headerTitle: HTMLHeadingElement = document.createElement('h1');
    headerTitle.innerText = text;
    return headerTitle;
  }

  render(): HTMLDivElement {
    return this.container;
  }
}

export default Page;