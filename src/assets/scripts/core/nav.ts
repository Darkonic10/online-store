import Component from './component';
import { Buttons } from '../data/pages';

class Header extends Component {
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderPageButtons() {
    const pageButtons = document.createElement('div');
    Buttons.forEach((button) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.href = `#${button.id}`;
      buttonHTML.innerText = button.text;
      pageButtons.append(buttonHTML);
    });
    this.container.append(pageButtons);
  }

  // renderHeaderLinks() {
  //   const headerBasket = document.querySelector('.header__basket');
  //   const headerLogo = document.querySelector('.header__logo');
  // }

  render() {
    this.renderPageButtons();
    return this.container;
  }
}

export default Header;
