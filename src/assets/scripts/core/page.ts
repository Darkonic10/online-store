abstract class Page {
  protected container: HTMLDivElement;
  protected containerFilters: HTMLDivElement;

  protected constructor(id: string) {
    this.container = document.createElement('div');
    this.containerFilters = document.createElement('div');
    this.container.id = id;
  }

  renderFilters(): HTMLElement {
    return this.containerFilters
  }

  render(): HTMLElement {
    return this.container;
  }
}

export default Page