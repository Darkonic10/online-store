import noLogo from '../../../images/basket-card/no-logo.webp';
import mir from '../../../images/basket-card/mir-en.svg';
import visa from '../../../images/basket-card/visa.svg';
import mastercard from '../../../images/basket-card/mastercard.svg';

export function addModal(container: HTMLDivElement, button: HTMLButtonElement): void {
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
    const cardImg = document.createElement('div');
    cardImg.className = 'modal__card-img'
    const inputCardNumber = document.createElement('input');
    inputCardNumber.type = 'number';
    inputCardNumber.placeholder = 'Card number';
    inputCardNumber.className = 'modal__card-input-number'

    const cardOtherData = document.createElement('div');
    cardOtherData.className = 'modal__card-other';
    const validData = document.createElement('div');
    validData.className = 'modal__other-valid';
    const validText = document.createElement('span');
    validText.innerText = 'VALID:';
    validText.className = 'modal__valid-text';
    const inputValid = document.createElement('input');
    inputValid.type = 'text';
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
    cardDetails.append(cardHead, cardData);

    const confirmButton = document.createElement('button');
    confirmButton.innerText = 'CONFIRM';
    confirmButton.className = 'modal__confirm';

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


    const spanError = document.createElement('span');
    spanError.innerText = 'error';
    const spanError2 = document.createElement('span');
    spanError2.innerText = 'error';
    const spanError3 = document.createElement('span');
    spanError3.innerText = 'error';
    const spanError4 = document.createElement('span');
    spanError4.innerText = 'error';

    const cardNumberErr = document.createElement('span');
    cardNumberErr.innerText = 'Card number - error';
    const cardDataErr = document.createElement('span');
    cardDataErr.innerText = 'Card date - error';
    const cardCvvErr = document.createElement('span');
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

    const successBuy = document.createElement('h1');
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