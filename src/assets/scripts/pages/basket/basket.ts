import Page from "../../core/page";
import { checkBookId, formatterUSD, getElementBySelector, getMapBasketStorage } from "../../types/checks";
import { book } from "../../types/Interfaces";
import {PageIds} from "../../types/enums";

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
              <span class="basket__page-curr">1</span>
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
    `;
    const basketItems: HTMLDivElement = getElementBySelector(basket, HTMLDivElement, '.basket__items');
    const booksItemsMap: Map<string, number> = getMapBasketStorage();
    const mapSize: number = +booksItemsMap.size;
    let totalPrice = 0;
    let countItems = 0;

    for (const entry of booksItemsMap) {
      countItems += entry[1];
      totalPrice += checkBookId(+entry[0]).price * entry[1];
    }

    this.container.append(title, basket);

    const itemsPerPage: HTMLInputElement = getElementBySelector(basket, HTMLInputElement, '.basket__pages-input');
    const pagePrev: HTMLButtonElement = getElementBySelector(basket, HTMLButtonElement, '.basket__page-prev');
    const pageNumber: HTMLSpanElement = getElementBySelector(basket, HTMLSpanElement, '.basket__page-curr');
    const pageNext: HTMLButtonElement = getElementBySelector(basket, HTMLButtonElement, '.basket__page-next');

    let pagesCount = 1;

    function pagination(itemsPage: number, page: number) {
      pagesCount = Math.ceil(mapSize / itemsPage);

      const start = itemsPage * (page - 1);

      if(!(page * itemsPage <= mapSize)) {
        itemsPage = mapSize % itemsPage;
      }

      let i = 0;
      const end = start + itemsPage;
      for (const entry of booksItemsMap) {
        if(i >= start && i < end) {
          const currBook: book = checkBookId(+entry[0]);
          const bookItem: HTMLDivElement = document.createElement('div');
          bookItem.className = `basket__item item-${i + 1}`;
          const listNumb: HTMLDivElement = document.createElement('div');
          listNumb.className = 'basket__item-number';
          listNumb.innerText = String(i + 1);

          const itemInfo: HTMLDivElement = document.createElement('div');
          itemInfo.className = 'basket__item-info';
          const bookImg: HTMLImageElement = document.createElement('img');
          bookImg.className = 'basket__item-img';
          bookImg.src = currBook.book_image[0];
          const itemDetail: HTMLDivElement = document.createElement('div');
          itemDetail.className = 'basket__item-detail';
          const itemTitle: HTMLHeadingElement = document.createElement('h3');
          itemTitle.innerText = currBook.title;
          const itemDescription: HTMLParagraphElement = document.createElement('p');
          itemDescription.innerText = currBook.description;
          itemDetail.append(itemTitle, itemDescription);
          itemInfo.append(bookImg, itemDetail);

          const itemControl: HTMLDivElement = document.createElement('div');
          itemControl.className = 'basket__item-control';
          const stockDiv: HTMLDivElement = document.createElement('div');
          stockDiv.className = 'basket__item-stock';
          const stockValue: HTMLSpanElement = document.createElement('span');
          stockValue.className = 'basket__stock-value'
          stockValue.innerText = `Stock: ${String(currBook.stock_balance)}`;
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
          itemPrice.innerText = `${String(formatterUSD.format(currBook.price))}`
          stockDiv.append(stockValue);
          itemNumberDiv.append(buttonMinus, currQuantity, buttonPlus);
          itemPriceDiv.append(itemPrice);
          itemControl.append(stockDiv, itemNumberDiv, itemPriceDiv);

          bookItem.append(listNumb, itemInfo, itemControl);
          basketItems.append(bookItem);
        }
        i++;
      }
    }

    pagination(+itemsPerPage.value, +pageNumber.innerText);

    const basketSummary: HTMLDivElement = getElementBySelector(basket, HTMLDivElement, '.basket__summary');
    const basketProducts: HTMLParagraphElement = document.createElement('p');
    basketProducts.className = 'basket__items-count';
    basketProducts.innerText = `Products: ${countItems}`;
    const totalPriceHTML: HTMLParagraphElement = document.createElement('p');
    totalPriceHTML.className = 'basket__items-total';
    totalPriceHTML.innerText = `Total: ${formatterUSD.format(totalPrice)}`;
    const inputPromo: HTMLInputElement = document.createElement('input');
    inputPromo.className = 'basket__promo';
    inputPromo.type = 'text';
    inputPromo.placeholder = 'Enter promo code';
    const buyButton: HTMLButtonElement = document.createElement('button');
    buyButton.className = 'basket__buy-button';
    buyButton.innerText = 'BUY NOW';
    basketSummary.append(basketProducts, totalPriceHTML, inputPromo, buyButton);

    itemsPerPage.addEventListener('input', () => {
      if(+itemsPerPage.value > 0) {
        pageNumber.innerText = '1';
        history.pushState(null, '', `#${PageIds.BasketPage}?limit=${itemsPerPage.value}&page=${pageNumber.innerText}`)
        basketItems.replaceChildren();
        pagination(+itemsPerPage.value, +pageNumber.innerText);
      }
    })

    pagePrev.addEventListener('click', () => {
      if(+pageNumber.innerText - 1 >= 1) {
        pageNumber.innerText = String(+pageNumber.innerText - 1);
        history.pushState(null, '', `#${PageIds.BasketPage}?limit=${itemsPerPage.value}&page=${pageNumber.innerText}`)
        basketItems.replaceChildren();
        pagination(+itemsPerPage.value, +pageNumber.innerText);
      }
    })

    pageNext.addEventListener('click', () => {
      if(+pageNumber.innerText + 1 <= pagesCount) {
        pageNumber.innerText = String(+pageNumber.innerText + 1);
        history.pushState(null, '', `#${PageIds.BasketPage}?limit=${itemsPerPage.value}&page=${pageNumber.innerText}`)
        basketItems.replaceChildren();
        pagination(+itemsPerPage.value, +pageNumber.innerText);
      }
    })

    return this.container
  }

  render(): HTMLElement {
    return this.createMain();
  }
}

export default BasketPage;
