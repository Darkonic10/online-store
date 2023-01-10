import { books } from "../data/books";
import { PageIds } from "./enums";
import { book, Options } from "./Interfaces";

export const locStMainOptions = 'mainOptions';

export function getElementBySelector <T extends typeof Element>(
  element: DocumentFragment | HTMLElement | Document,
  type: T,
  selector: string): InstanceType<T> {
  const result = element.querySelector(selector);
  if (!result) {
    throw new Error(`Selector ${selector} didn't match any elements.`);
  }
  if (!(result instanceof type)) {
    throw new TypeError(`Selector ${selector} have wrong type`);
  }
  return result as InstanceType<T>;
}

export function getLocalStorage (element: Storage, selector: string): string {
  const result = element.getItem(selector);
  if (!result && selector === 'totalPrice') {
    return '0';
  }
  if (!result) {
    return '{}';
  }
  return result;
}

export function getMapBasketStorage(selector: string): Map<string, number> {
  return new Map(Object.entries(JSON.parse(getLocalStorage(localStorage, selector)) as { [s: string]: number; }));
}

export let mainOptions: Options = new Map();

export function getMainOptions(): void {
  mainOptions = new Map(Object.entries(JSON.parse(getLocalStorage(localStorage, locStMainOptions)) as { [s: string]: string; }));
}

export function setMainOptions(): void {
  const opt = JSON.stringify(Object.fromEntries(mainOptions));
  localStorage.setItem(locStMainOptions, opt);
}

export function checkBookId(id: number): book {
  for (const book of books) {
    if (book.id === id) {
      return book;
    }
  }
  throw new Error('No such ID');
}

export function getHash(hash: string): string {
  if (!hash) return PageIds.MainPage;
  const posOptions: number = hash.indexOf('?');
  if (posOptions < 0) {
    return hash.slice(1);
  }
  return hash.slice(1, posOptions);
}

export function createElementByTag <T extends typeof HTMLElement>(tagName: string, classNames: string, type: T, content?: string): InstanceType<T> {
  const result = document.createElement(tagName);
  result.className = classNames;
  if (content) {
    result.textContent = content;
  }
  if (!(result instanceof type)) {
    throw new TypeError(`Selector ${tagName} have wrong type`);
  }
  return result as InstanceType<T>;
}

export function getOptions(opt: string): Options {
  const result = new Map();
  const arr = opt.split('&');
  for (let i = 0; i < arr.length; i++) {
    const element = arr[i].split('=');
    if (element.length === 2) {
      result.set(element[0], element[1]);
    }
  }
  return result as Map<string, string>;
}

export function getBookID(options: Options): number {
  const res = options.get('id');
  if (typeof res === 'string') {
    const result = parseInt(res);
    if (books.some(val => val.id === result)) {
      return result;
    }
  }
  return -1;
}

export const formatterUSD = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  style: 'currency',
  currency: 'USD',
});

export function getMainAddress(): string {
  setMainOptions();
  if (mainOptions.size === 0) {
    return `#${PageIds.MainPage}`;
  }
  const arr: string[] = [];
  mainOptions.forEach((val, key) => {
    arr.push(`${key}=${val}`);
  })
  return `#${PageIds.MainPage}?${arr.join('&')}`;
}

export function resetMainOptions(): void {
  mainOptions = new Map();
  setMainOptions();
}

export function setHeaderCounters(): void {
  const booksItemsMap: Map<string, number> = getMapBasketStorage('basketIds');
  let totalPrice = 0;
  let countItems = 0;

  for (const entry of booksItemsMap) {
    countItems += entry[1];
    totalPrice += checkBookId(+entry[0]).price * entry[1];
  }
  const usdTotal: string = formatterUSD.format(totalPrice);

  const basketCounter: HTMLSpanElement = getElementBySelector(document, HTMLSpanElement, '.header__counter-span');
  basketCounter.innerText = countItems.toString();
  const totalPriceHTML: HTMLSpanElement = getElementBySelector(document, HTMLSpanElement, '.header__price-value');
  totalPriceHTML.innerText = usdTotal;
}