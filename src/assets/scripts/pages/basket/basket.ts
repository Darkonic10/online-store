import Page from "../../core/page";
import { checkBookId, formatterUSD, getElementBySelector, getMapBasketStorage } from "../../types/checks";
import { book } from "../../types/Interfaces";
import { PageIds } from "../../types/enums";

class BasketPage extends Page{
  static TextObject = {
    MainTitle: 'BasketPage',
  };
  itemsPage: number;
  page: number;

  constructor(id: string, itemsPage: number, page: number) {
    super(id);
    this.itemsPage = itemsPage;
    this.page = page;
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
    const booksItemsMap: Map<string, number> = getMapBasketStorage('basketIds');
    let totalPrice = 0;
    let countItems = 0;

    const emptyBasket = document.createElement('h1');
    emptyBasket.innerText = 'The basket is empty';
    emptyBasket.className = 'basket__empty';
    if(booksItemsMap.size === 0) {
      this.container.append(emptyBasket);
    } else {
      this.container.append(title, basket);
    }

    const itemsPerPage: HTMLInputElement = getElementBySelector(basket, HTMLInputElement, '.basket__pages-input');
    const pagePrev: HTMLButtonElement = getElementBySelector(basket, HTMLButtonElement, '.basket__page-prev');
    const pageNumber: HTMLSpanElement = getElementBySelector(basket, HTMLSpanElement, '.basket__page-curr');
    const pageNext: HTMLButtonElement = getElementBySelector(basket, HTMLButtonElement, '.basket__page-next');
    itemsPerPage.value = String(this.itemsPage)
    pageNumber.innerText = String(this.page);

    let pagesCount = 1;

    const pagination = (itemsPage: number, page: number) => {
      pagesCount = Math.ceil(+booksItemsMap.size / itemsPage);
      const start = itemsPage * (page - 1);

      if(!(page * itemsPage <= +booksItemsMap.size)) {
        itemsPage = +booksItemsMap.size % itemsPage;
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
          currQuantity.innerText = String(entry[1]);
          const buttonMinus: HTMLButtonElement = document.createElement('button');
          buttonMinus.className = 'basket__item-delete';
          buttonMinus.innerText = '-';
          const itemPriceDiv: HTMLDivElement = document.createElement('div');
          itemPriceDiv.className = 'basket__item-price';
          const itemPrice: HTMLSpanElement = document.createElement('span');
          itemPrice.className = 'basket__price-value';
          itemPrice.innerText = `${String(formatterUSD.format(currBook.price * entry[1]))}`
          stockDiv.append(stockValue);
          itemNumberDiv.append(buttonMinus, currQuantity, buttonPlus);
          itemPriceDiv.append(itemPrice);
          itemControl.append(stockDiv, itemNumberDiv, itemPriceDiv);

          bookItem.append(listNumb, itemInfo, itemControl);
          basketItems.append(bookItem);

          bookItem.addEventListener('click', (event) => {
            if(event.target === buttonPlus) {
              if(+currQuantity.innerText + 1 <= currBook.stock_balance) {
                currQuantity.innerText = String(+currQuantity.innerText + 1);
                itemPrice.innerText = `${String(formatterUSD.format(currBook.price * +currQuantity.innerText))}`
                booksItemsMap.set(entry[0], +currQuantity.innerText);
                localStorage.setItem('basketIds', JSON.stringify(Object.fromEntries(booksItemsMap)))
              }
            }
            if(event.target === buttonMinus) {
              if(+currQuantity.innerText > 1) {
                currQuantity.innerText = String(+currQuantity.innerText - 1);
                itemPrice.innerText = `${String(formatterUSD.format(currBook.price * +currQuantity.innerText))}`
                booksItemsMap.set(entry[0], +currQuantity.innerText);
                localStorage.setItem('basketIds', JSON.stringify(Object.fromEntries(booksItemsMap)))
              } else {
                bookItem.remove();
                booksItemsMap.delete(entry[0]);
                localStorage.setItem('basketIds', JSON.stringify(Object.fromEntries(booksItemsMap)))
                basketItems.replaceChildren();
                if((i - 1) === start) {
                  pageNumber.innerText = String(+pageNumber.innerText - 1);
                  history.pushState(null, '', `#${PageIds.BasketPage}?limit=${itemsPerPage.value}&page=${pageNumber.innerText}`);
                  pagesCount -= 1;
                  pagination(+itemsPerPage.value, pagesCount);

                } else {
                  pagination(+itemsPerPage.value, +pageNumber.innerText);
                }

                if(booksItemsMap.size === 0) {
                  this.container.replaceChildren();
                  this.container.append(emptyBasket);
                }
              }
            }
            if(event.target === buttonPlus || event.target === buttonMinus) {
              getCounting();
            }
          })
        }
        i++;
      }
    }

    pagination(this.itemsPage, this.page);

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
    const testPromo: HTMLSpanElement = document.createElement('span');
    testPromo.innerText = 'Promo for test: \'RS\', \'EPM\'';
    const buyButton: HTMLButtonElement = document.createElement('button');
    buyButton.className = 'basket__buy-button';
    buyButton.innerText = 'BUY NOW';
    basketSummary.append(basketProducts, totalPriceHTML);

    const promoDiv = document.createElement('div');
    promoDiv.className = 'basket__promo-result';
    const promoDetail = document.createElement('span');
    promoDetail.className = 'basket__promo-info';
    const promoAdd = document.createElement('button');
    promoAdd.className = 'basket__promo-add';
    promoAdd.innerText = 'ADD';
    const countPromo: Map<string, number> = getMapBasketStorage('promo');

    function checkPromo(): void {
      if(inputPromo.value.toUpperCase() === 'RS' && !countPromo.has('RS')) {
        promoDetail.innerText = 'Rolling Scopes School - 10%';
        promoDiv.append(promoDetail, promoAdd);
        inputPromo.after(promoDiv);
      }
      if(inputPromo.value.toUpperCase() === 'EPM' && !countPromo.has('EPM')) {
        promoDetail.innerText = 'EPAM Systems - 10%';
        promoDiv.append(promoDetail, promoAdd);
        inputPromo.after(promoDiv);
      }
    }

    inputPromo.addEventListener('input', () => {
      promoDiv.remove();
      checkPromo();
    })

    let discount = 1;
    function getDiscount(): void {
      discount = 1;
      for (const value of countPromo.values()) {
        discount -= value;
      }
    }
    getDiscount()

    const totalPriceNew: HTMLParagraphElement = document.createElement('p');
    totalPriceNew.className = 'basket__price-promo';
    totalPriceNew.innerText = `Total: ${formatterUSD.format(totalPrice * discount)}`
    const applyPromo = document.createElement('div');
    applyPromo.className = 'basket__apply-promo';
    const applyHead = document.createElement('h3');
    applyHead.innerText = 'Applied codes';
    applyPromo.append(applyHead);

    function getCounting(): void {
      totalPrice = 0;
      countItems = 0;
      for (const entry of booksItemsMap) {
        countItems += entry[1];
        totalPrice += checkBookId(+entry[0]).price * entry[1];
      }
      basketProducts.innerText = `Products: ${countItems}`;
      totalPriceHTML.innerText = `Total: ${formatterUSD.format(totalPrice)}`;
      getDiscount();
      totalPriceNew.innerText = `Total: ${formatterUSD.format(totalPrice * discount)}`;
    }
    getCounting();

    if(countPromo.size) {
      totalPriceHTML.after(totalPriceNew, applyPromo);
      totalPriceHTML.classList.add('old-price');
    } else {
      totalPriceNew.remove();
      applyPromo.remove();
    }

    for (const entry of countPromo) {
      const currentsPromo = document.createElement('div');
      currentsPromo.className = 'basket__applied-promo';
      const namePromo = document.createElement('span');
      const deletePromoBtn = document.createElement('button');
      deletePromoBtn.innerText = 'DROP';

      if(entry[0] === 'RS') {
        namePromo.innerText = 'Rolling Scopes School - 10% - '
        applyPromo.append(currentsPromo);
        currentsPromo.append(namePromo, deletePromoBtn);
      }
      if(entry[0] === 'EPM') {
        namePromo.innerText = 'EPAM Systems - 10% - ';
        applyPromo.append(currentsPromo);
        currentsPromo.append(namePromo, deletePromoBtn);
      }

      deletePromoBtn.addEventListener('click', () => {
        countPromo.delete(entry[0]);
        localStorage.setItem('promo', JSON.stringify(Object.fromEntries(countPromo)));
        currentsPromo.remove();
        checkPromo();
        getDiscount();
        totalPriceNew.innerText = `Total: ${formatterUSD.format(totalPrice * discount)}`;
        if(countPromo.size === 0) {
          applyPromo.remove();
          totalPriceNew.remove();
          totalPriceHTML.classList.remove('old-price');
        }
      })
    }

    promoAdd.addEventListener('click', () => {
      promoDiv.remove();
      totalPriceNew.remove();
      applyPromo.remove();
      totalPriceHTML.classList.add('old-price');

      totalPriceHTML.after(totalPriceNew, applyPromo);
      const namePromo = document.createElement('span');
      const currentsPromo = document.createElement('div');
      currentsPromo.className = 'basket__applied-promo';
      const deletePromoBtn = document.createElement('button');
      deletePromoBtn.innerText = 'DROP';
      if(inputPromo.value.toUpperCase() === 'RS') {
        countPromo.set('RS', 0.1);
        namePromo.innerText = 'Rolling Scopes School - 10% - ';
        applyPromo.append(currentsPromo);
        currentsPromo.append(namePromo, deletePromoBtn);
        localStorage.setItem('promo', JSON.stringify(Object.fromEntries(countPromo)));
      }
      if(inputPromo.value.toUpperCase() === 'EPM') {
        countPromo.set('EPM', 0.1);
        namePromo.innerText = 'EPAM Systems - 10% - ';
        applyPromo.append(currentsPromo);
        currentsPromo.append(namePromo, deletePromoBtn);
        localStorage.setItem('promo', JSON.stringify(Object.fromEntries(countPromo)));
      }
      getDiscount();
      totalPriceNew.innerText = `Total: ${formatterUSD.format(totalPrice * discount)}`;

      deletePromoBtn.addEventListener('click', () => {
        if(namePromo.innerText === 'Rolling Scopes School - 10% - ') {
          countPromo.delete('RS');
        } else if (namePromo.innerText === 'EPAM Systems - 10% - ') {
          countPromo.delete('EPM');
        }
        localStorage.setItem('promo', JSON.stringify(Object.fromEntries(countPromo)));
        currentsPromo.remove();
        checkPromo();
        getDiscount();
        totalPriceNew.innerText = `Total: ${formatterUSD.format(totalPrice * discount)}`;
        if(countPromo.size === 0) {
          totalPriceNew.remove();
          applyPromo.remove();
          totalPriceHTML.classList.remove('old-price');
        }
      })
    })

    basketSummary.append(inputPromo, testPromo, buyButton)

    itemsPerPage.addEventListener('input', () => {
      if(+itemsPerPage.value > 0) {
        pagesCount = Math.ceil(+booksItemsMap.size / +itemsPerPage.value);
        if(+pageNumber.innerText > pagesCount) {
          pageNumber.innerText = String(pagesCount);
        }
        history.pushState(null, '', `#${PageIds.BasketPage}?limit=${itemsPerPage.value}&page=${pageNumber.innerText}`);
        basketItems.replaceChildren();
        pagination(+itemsPerPage.value, +pageNumber.innerText);
      }
    })

    pagePrev.addEventListener('click', () => {
      if(+pageNumber.innerText - 1 >= 1) {
        pageNumber.innerText = String(+pageNumber.innerText - 1);
        history.pushState(null, '', `#${PageIds.BasketPage}?limit=${itemsPerPage.value}&page=${pageNumber.innerText}`);
        basketItems.replaceChildren();
        pagination(+itemsPerPage.value, +pageNumber.innerText);
      }
    })

    pageNext.addEventListener('click', () => {
      if(+pageNumber.innerText + 1 <= pagesCount) {
        pageNumber.innerText = String(+pageNumber.innerText + 1);
        history.pushState(null, '', `#${PageIds.BasketPage}?limit=${itemsPerPage.value}&page=${pageNumber.innerText}`);
        basketItems.replaceChildren();
        pagination(+itemsPerPage.value, +pageNumber.innerText);
      }
    })

    const modalContainer = document.createElement('div');
    modalContainer.className = 'modal__container';
    const modalContent = document.createElement('div');
    modalContent.className = 'modal__content';
    modalContainer.append(modalContent);

    const contentForm = document.createElement('form');
    contentForm.className = 'modal__content-form';

    const personDetails = document.createElement('div');
    personDetails.className = 'modal__detail';
    const detailsHead = document.createElement('h2');
    detailsHead.innerText = 'Personal details';
    detailsHead.className = 'modal__detail-head';

    const nameDiv = document.createElement('div');
    nameDiv.className = 'modal__div-name';
    const phoneDiv = document.createElement('div');
    phoneDiv.className = 'modal__div-phone';
    const addressDiv = document.createElement('div');
    addressDiv.className = 'modal__div-address';
    const emailDiv = document.createElement('div');
    emailDiv.className = 'modal__div-emailDiv';

    const inputName = document.createElement('input');
    inputName.type = 'text';
    inputName.placeholder = 'Name';
    inputName.className = 'input modal__input-name';
    const inputPhone = document.createElement('input');
    inputPhone.type = 'tel';
    inputPhone.placeholder = 'Phone number';
    inputPhone.min = '9';
    inputPhone.className = 'input modal__input-phone';
    const inputAddress = document.createElement('input');
    inputAddress.type = 'text';
    inputAddress.placeholder = 'Delivery address';
    inputAddress.className = 'input modal__input-address';
    const inputEmail = document.createElement('input');
    inputEmail.type = 'email';
    inputEmail.placeholder = 'E-mail';
    inputEmail.className = 'input modal__input-email';

    const cardDetails = document.createElement('div');
    cardDetails.className = 'modal__card-details';
    const cardHead = document.createElement('h2');
    cardHead.innerText = 'Credit card details';
    cardHead.className = 'modal__card-head';
    const cardData = document.createElement('div');
    cardData.className = 'modal__card-data';

    const cardNumber = document.createElement('div');
    cardNumber.className = 'modal__card-number';
    const cardImg = document.createElement('img');
    cardImg.className = 'modal__card-img'
    cardImg.alt = 'Card icon';
    cardImg.src = '../../../images/basket-card/no-logo.webp';
    const inputCardNumber = document.createElement('input');
    inputCardNumber.type = 'number';
    inputCardNumber.placeholder = 'Card number';

    const cardOtherData = document.createElement('div');
    cardOtherData.className = 'modal__card-other';
    const validData = document.createElement('div');
    validData.className = 'modal__other-valid';
    const validText = document.createElement('span');
    validText.innerText = 'VALID:';
    validText.className = 'modal__valid-text';
    const inputValid = document.createElement('input');
    inputValid.type = 'number';
    inputValid.placeholder = 'Valid date';
    inputValid.className = 'modal__valid-input';

    const cvvData = document.createElement('div');
    cvvData.className = 'modal__other-cvv';
    const cvvText = document.createElement('span');
    cvvText.innerText = 'CVV:';
    cvvText.className = 'modal__cvv-text';
    const cvvValid = document.createElement('input');
    cvvValid.type = 'number';
    cvvValid.placeholder = 'Code';
    cvvValid.className = 'modal__cvv-input';

    nameDiv.append(inputName);
    phoneDiv.append(inputPhone);
    addressDiv.append(inputAddress);
    emailDiv.append(inputEmail);
    personDetails.append(detailsHead, nameDiv, phoneDiv, addressDiv, emailDiv);
    cardNumber.append(cardImg, inputCardNumber);
    validData.append(validText, inputValid);
    cvvData.append(cvvText, cvvValid);
    cardOtherData.append(validData, cvvData);
    cardData.append(cardNumber, cardOtherData);
    cardDetails.append(cardHead, cardData)

    const confirmButton = document.createElement('button');
    confirmButton.innerText = 'CONFIRM';
    confirmButton.className = 'modal__confirm';

    contentForm.append(personDetails, cardDetails, confirmButton);
    modalContent.append(contentForm);

    buyButton.addEventListener('click', () => {
      this.container.append(modalContainer);
    })

    modalContainer.addEventListener('click', (event) => {
      if(event.target === modalContainer) {
        modalContainer.remove();
      }
    })

    inputName.addEventListener('blur', () => {
      const inputValue = inputName.value;
      const checkLetters = /^[a-z\s]+$/i.test(inputValue);
      const splitValues = inputValue.split(' ');
      const checkLength = splitValues.every((e) => e.length >= 3)

      if(checkLetters && splitValues.length >= 2 && checkLength) {
        console.log('Good name field');
      } else {
        console.log('Error');
      }
    });

    inputPhone.addEventListener('blur', () => {
      const validNumber = /^[+]\d{9,}/.test(inputPhone.value);
      if(validNumber) {
        console.log('Good number field')
      } else {
        console.log('Error')
      }
    });

    inputAddress.addEventListener('blur', () => {
      const inputValue = inputAddress.value;
      const checkLetters = /^[a-z\s]+$/i.test(inputValue);
      const splitValues = inputValue.split(' ');
      const checkLength = splitValues.every((e) => e.length >= 5)

      if(checkLetters && splitValues.length >= 3 && checkLength) {
        console.log('Good address field');
      } else {
        console.log('Error');
      }
    });

    inputEmail.addEventListener('blur', () => {
      const checkEmail = /^\w[\w-.]*@[\w-]+\.[a-z]{2,4}$/i.test(inputEmail.value);
      if(checkEmail) {
        console.log('Good email field');
      } else {
        console.log('Error');
      }
    });

    return this.container
  }

  render(): HTMLElement {
    return this.createMain();
  }
}

export default BasketPage;
