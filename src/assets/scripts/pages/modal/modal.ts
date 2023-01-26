import noLogo from '../../../images/basket-card/no-logo.webp';
import mir from '../../../images/basket-card/mir-en.svg';
import visa from '../../../images/basket-card/visa.svg';
import mastercard from '../../../images/basket-card/mastercard.svg';
import { createElementWithOptions } from '../../types/checks';

export function addModal(container: HTMLDivElement, button: HTMLButtonElement): void {
  const modalContainer = createElementWithOptions('div', HTMLDivElement, {className: 'modal__container'});
    const modalContent = createElementWithOptions('div', HTMLDivElement, {className: 'modal__content'});
    modalContainer.append(modalContent);

    const contentForm = createElementWithOptions('form', HTMLFormElement, {className: 'modal__content-form'});

    const personDetails = createElementWithOptions('div', HTMLDivElement, {className: 'modal__detail'});
    const detailsHead = createElementWithOptions('h2', HTMLHeadingElement, {innerText: 'Personal details', className: 'modal__detail-head'});

    const nameDiv = createElementWithOptions('div', HTMLDivElement, {className: 'modal__div-name'});
    const phoneDiv = createElementWithOptions('div', HTMLDivElement, {className: 'modal__div-phone'});
    const addressDiv = createElementWithOptions('div', HTMLDivElement, {className: 'modal__div-address'});
    const emailDiv = createElementWithOptions('div', HTMLDivElement, {className: 'modal__div-emailDiv'});

    const inputName = createElementWithOptions('input', HTMLInputElement, {type: 'text', placeholder: 'Name', className: 'input modal__input-name'});
    const inputPhone = createElementWithOptions('input', HTMLInputElement, {type: 'tel', placeholder: 'Phone number', min: '9', className: 'input modal__input-phone'});
    const inputAddress = createElementWithOptions('input', HTMLInputElement, {type: 'text', placeholder: 'Delivery address', className: 'input modal__input-address'});
    const inputEmail = createElementWithOptions('input', HTMLInputElement, {type: 'email', placeholder: 'E-mail', className: 'input modal__input-email'});

    const cardDetails = createElementWithOptions('div', HTMLDivElement, {className: 'modal__card-details'});
    const cardHead = createElementWithOptions('h2', HTMLHeadingElement, {className: 'modal__card-head', innerText: 'Credit card details'});
    const cardData = createElementWithOptions('div', HTMLDivElement, {className: 'modal__card-data'});

    const cardNumber = createElementWithOptions('div', HTMLDivElement, {className: 'modal__card-number'});
    const cardImg = createElementWithOptions('div', HTMLDivElement, {className: 'modal__card-img'});
    const inputCardNumber = createElementWithOptions('input', HTMLInputElement, {type: 'number', placeholder: 'Card number', className: 'modal__card-input-number'});

    const cardOtherData = createElementWithOptions('div', HTMLDivElement, {className: 'modal__card-other'});
    const validData = createElementWithOptions('div', HTMLDivElement, {className: 'modal__other-valid'});
    const validText = createElementWithOptions('span', HTMLSpanElement, {innerText: 'VALID:', className: 'modal__valid-text'});
    const inputValid = createElementWithOptions('input', HTMLInputElement, {type: 'text', placeholder: 'Valid date', className: 'modal__valid-input'});

    const cvvData = createElementWithOptions('div', HTMLDivElement, {className: 'modal__other-cvv'});
    const cvvText = createElementWithOptions('span', HTMLSpanElement, {innerText: 'CVV:', className: 'modal__cvv-text'});
    const cvvValid = createElementWithOptions('input', HTMLInputElement, {type: 'number', placeholder: 'Code', className: 'modal__cvv-input'});

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
    cardDetails.append(cardHead, cardData);

    const confirmButton = createElementWithOptions('button', HTMLButtonElement, {innerText: 'CONFIRM', className: 'modal__confirm'});

    contentForm.append(personDetails, cardDetails, confirmButton);
    modalContent.append(contentForm);

    button.addEventListener('click', () => {
      container.append(modalContainer);
    })

    modalContainer.addEventListener('click', (event) => {
      if (event.target === modalContainer) {
        modalContainer.remove();
      }
    })


    const spanError = createElementWithOptions('span', HTMLSpanElement, {});
    spanError.innerText = 'error';
    const spanError2 = createElementWithOptions('span', HTMLSpanElement, {});
    spanError2.innerText = 'error';
    const spanError3 = createElementWithOptions('span', HTMLSpanElement, {});
    spanError3.innerText = 'error';
    const spanError4 = createElementWithOptions('span', HTMLSpanElement, {});
    spanError4.innerText = 'error';

    const cardNumberErr = createElementWithOptions('span', HTMLSpanElement, {});
    cardNumberErr.innerText = 'Card number - error';
    const cardDataErr = createElementWithOptions('span', HTMLSpanElement, {});
    cardDataErr.innerText = 'Card date - error';
    const cardCvvErr = createElementWithOptions('span', HTMLSpanElement, {});
    cardCvvErr.innerText = 'Card cvv - error';

    function checkInputName(): boolean {
      const inputValue = inputName.value;
      const checkLetters = /^[a-z\s]+$/i.test(inputValue);
      const splitValues = inputValue.split(' ');
      const checkLength = splitValues.every((e) => e.length >= 3);
      const result = checkLetters && splitValues.length >= 2 && checkLength;
      if (!result) {
        nameDiv.append(spanError);
      } else {
        spanError.remove();
      }

      return result;
    }

    function checkInputNumber(): boolean {
      const checkRegExp = /^[+]\d{9,}/.test(inputPhone.value);
      if (!checkRegExp) {
        phoneDiv.append(spanError2);
      } else {
        spanError2.remove();
      }
      return checkRegExp;
    }

    function checkInputAddress(): boolean {
      const inputValue = inputAddress.value;
      const checkLetters = /^[a-z\s]+$/i.test(inputValue);
      const splitValues = inputValue.split(' ');
      const checkLength = splitValues.every((e) => e.length >= 5);
      const result = checkLetters && splitValues.length >= 3 && checkLength;
      if (!result) {
        addressDiv.append(spanError3);
      } else {
        spanError3.remove();
      }
      return result;
    }

    function checkInputEmail(): boolean {
      const result = /^\w[\w-.]*@[\w-]+\.[a-z]{2,4}$/i.test(inputEmail.value);
      if (!result) {
        emailDiv.append(spanError4);
      } else {
        spanError4.remove();
      }
      return result;
    }

    inputName.addEventListener('blur', () => {
      checkInputName();
    });
    inputPhone.addEventListener('blur', () => {
      checkInputNumber();
    });
    inputAddress.addEventListener('blur', () => {
      checkInputAddress();
    });
    inputEmail.addEventListener('blur', () => {
      checkInputEmail();
    });

    enum cards {
      Mir = 2,
      Visa = 4,
      Mastercard = 5,
    }

    function checkCardNumber(): boolean {
      const result = /^[245]\d{15}\b/.test(inputCardNumber.value);
      if (!result) {
        cardDetails.append(cardNumberErr);
      } else {
        cardNumberErr.remove();
      }
      return result;
    }

    function checkCardDate(): boolean {
      const result = /(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])/.test(inputValid.value);
      if (!result) {
        cardDetails.append(cardDataErr);
      } else {
        cardDataErr.remove();
      }
      return result;
    }

    function checkCardCvv(): boolean {
      const result = /\b\d{3}\b/i.test(cvvValid.value);
      if (!result) {
        cardDetails.append(cardCvvErr);
      } else {
        cardCvvErr.remove();
      }
      return result;
    }

    inputCardNumber.addEventListener('input', () => {
      if (inputCardNumber.value.length > 16) {
        inputCardNumber.value = inputCardNumber.value.slice(0, 16);
      }
      const paySystem = cards[+inputCardNumber.value[0]];
      if (paySystem === 'Mir') {
        cardImg.style.backgroundImage = `url("${mir as string}")`;
      } else if (paySystem === 'Visa') {
        cardImg.style.backgroundImage = `url("${visa as string}")`;
      } else if (paySystem === 'Mastercard') {
        cardImg.style.backgroundImage = `url("${mastercard as string}")`;
      } else {
        cardImg.style.backgroundImage = `url("${noLogo}")`;
      }
    })

    inputCardNumber.addEventListener('blur', () => {
      checkCardNumber();
    })

    inputValid.addEventListener('input', () => {
      inputValid.value = inputValid.value.replace(/[^\d|/]/g,'');
      if (+(inputValid.value[0] + inputValid.value[1]) > 12) {
        inputValid.value = inputValid.value.replace((inputValid.value[0] + inputValid.value[1]), '12');
      }
      if (inputValid.value.length === 2 && !inputValid.value.includes('/')) {
        inputValid.value = inputValid.value + '/';
      }
      if (inputValid.value.length > 5) {
        inputValid.value = inputValid.value.slice(0, 5);
      }
    })

    inputValid.addEventListener('blur', () => {
      checkCardDate();
    })

    cvvValid.addEventListener('input', () => {
      if (cvvValid.value.length > 3) {
          cvvValid.value = cvvValid.value.slice(0,3);
      }
    })

    cvvValid.addEventListener('blur', () => {
      checkCardCvv();
    })

    const successBuy = createElementWithOptions('h1', HTMLHeadingElement, {});
    successBuy.innerText = 'Your order has been completed. You will be redirected to the main page in 3 seconds.';

    confirmButton.addEventListener('click', () => {
      checkInputName();
      checkInputNumber();
      checkInputAddress();
      checkInputEmail();
      checkCardNumber();
      checkCardDate();
      checkCardCvv();
      if (checkInputName() && checkInputNumber() && checkInputAddress() && checkInputEmail() && checkCardNumber() && checkCardDate() && checkCardCvv()) {
        container.replaceChildren();
        container.append(successBuy);
        setTimeout(() => {
          localStorage.setItem('basketIds', JSON.stringify(Object.fromEntries(new Map())));
          window.location.href = '#main-page'
        }, 3000);
      }
    });
}