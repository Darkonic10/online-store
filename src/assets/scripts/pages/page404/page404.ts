import Page from '../../core/page';
import { ErrorTypes } from '../../types/enums';
import { stringObject } from '../../types/Interfaces';

class ErrorPage extends Page {
  private errorType: ErrorTypes | string;

  static TextObject: stringObject = {
    '404': 'Error 404! The page was not found.',
  };

  constructor(id: string, errorType: ErrorTypes | string) {
    super(id);
    this.errorType = errorType;
  }

  render(): HTMLDivElement {
    const content: HTMLDivElement = document.createElement('div');
    content.className = 'main';
    const title = this.createHeaderTitle(ErrorPage.TextObject[this.errorType]);
    title.className = 'main__container main__container_center';
    content.appendChild(title);
    this.container.append(content);
    return this.container;
  }
}

export default ErrorPage;