import Page from "../../core/page";
import {getElementBySelector, getLocalStorage} from "../../types/checks";
import {books} from "../../data/books";

class BasketPage extends Page{
  static TextObject = {
    MainTitle: 'BasketPage',
  };

  constructor(id: string) {
    super(id);
  }

  private createMain(): HTMLElement {
    const title = this.createHeaderTitle(BasketPage.TextObject.MainTitle);

    const basket: HTMLDivElement = document.createElement('div');
    basket.className = 'basket';
    basket.innerHTML = `
    <div class="container basket__container">
      <div class="basket__products">
        <div class="basket__head">
          <h2 class="basket__head-title">Products in Card</h2>
          <div class="basket__head-controls">
            <div class="basket__items-limit">
              <p>Items: </p>
              <input class="basket__pages-input" type="number" min="1" value="3">
            </div>
            <div class="basket__page-numbers">
              <p>Page: </p>
              <button class="basket__page-prev"><</button>
              <span class="basket__page-curr">0</span>
              <button class="basket__page-next">></button>
            </div>
          </div>
        </div>
        <div class="basket__items"></div>
      </div>
      <div class="basket__summary">
        <h2>Summary</h2>
      </div>
    </div>
    `
    const basketItems: HTMLDivElement = getElementBySelector(basket, HTMLDivElement, '.basket__items');
    const countBasket: Array<number> = JSON.parse(getLocalStorage(localStorage, 'basketIds')) as Array<number>;

    this.container.append(title, basket);
    for (let i = 0; i < countBasket.length; i++) {
      const bookItem: HTMLDivElement = document.createElement('div');
      bookItem.className = 'basket__item';
      const listNumb: HTMLDivElement = document.createElement('div');
      listNumb.className = 'basket__item-number';
      listNumb.innerText = String(i + 1);

      const itemInfo: HTMLDivElement = document.createElement('div');
      itemInfo.className = 'basket__item-info';
      const bookImg: HTMLImageElement = document.createElement('img');
      bookImg.className = 'basket__item-img';
      bookImg.src = books[countBasket[i]].book_image[0];
      const itemDetail: HTMLDivElement = document.createElement('div');
      itemDetail.className = 'basket__item-detail';
      const itemTitle: HTMLHeadingElement = document.createElement('h3');
      itemTitle.innerText = books[countBasket[i]].title;
      const itemDescription: HTMLParagraphElement = document.createElement('p');
      itemDescription.innerText = books[countBasket[i]].description;
      itemDetail.append(itemTitle, itemDescription);
      itemInfo.append(bookImg, itemDetail);

      const itemControl: HTMLDivElement = document.createElement('div');
      itemControl.className = 'basket__item-control';
      const stockDiv: HTMLDivElement = document.createElement('div');
      stockDiv.className = 'basket__item-stock';
      const stockValue: HTMLSpanElement = document.createElement('span');
      stockValue.className = 'basket__stock-value'
      stockValue.innerText = `Stock: ${String(books[countBasket[i]].stock_balance)}`;
      const itemNumberDiv: HTMLDivElement = document.createElement('div');
      itemNumberDiv.className = 'basket__item-number-div';
      const buttonPlus: HTMLButtonElement = document.createElement('button');
      buttonPlus.className = 'basket__item-add';
      buttonPlus.innerText = '+';
      const currQuantity: HTMLSpanElement = document.createElement('span');
      currQuantity.className = 'basket__item-quantity';
      currQuantity.innerText = '1';
      const buttonMinus: HTMLButtonElement = document.createElement('button');
      buttonMinus.className = 'basket__item-delete';
      buttonMinus.innerText = '-';
      const itemPriceDiv: HTMLDivElement = document.createElement('div');
      itemPriceDiv.className = 'basket__item-price';
      const itemPrice: HTMLSpanElement = document.createElement('span');
      itemPrice.className = 'basket__price-value';
      itemPrice.innerText = `$${String(books[countBasket[i]].price)}`
      stockDiv.append(stockValue);
      itemNumberDiv.append(buttonPlus, currQuantity, buttonMinus);
      itemPriceDiv.append(itemPrice);
      itemControl.append(stockDiv, itemNumberDiv, itemPriceDiv);

      bookItem.append(listNumb, itemInfo, itemControl);
      basketItems.append(bookItem);
    }
    const basketSummary: HTMLDivElement = getElementBySelector(basket, HTMLDivElement, '.basket__summary');
    const basketProducts: HTMLParagraphElement = document.createElement('p');
    basketProducts.className = 'basket__items-count';
    basketProducts.innerText = `Products: ${countBasket.length}`;
    const totalPrice: HTMLParagraphElement = document.createElement('p');
    const countTotalPrice: number = JSON.parse(getLocalStorage(localStorage, 'totalPrice')) as number;
    totalPrice.className = 'basket__items-total';
    totalPrice.innerText = `Total: $${countTotalPrice}.00`;
    const inputPromo: HTMLInputElement = document.createElement('input');
    inputPromo.className = 'basket__promo';
    inputPromo.type = 'text';
    inputPromo.placeholder = 'Enter promo code';
    const buyButton: HTMLButtonElement = document.createElement('button');
    buyButton.className = 'basket__buy-button';
    buyButton.innerText = 'BUY NOW';
    basketSummary.append(basketProducts, totalPrice, inputPromo, buyButton);

    return this.container
  }

  render(): HTMLElement {
    return this.createMain();
  }
}

export default BasketPage;