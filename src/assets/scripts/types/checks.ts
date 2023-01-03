import { books } from "../data/books";
import { PageIds } from "./enums";
import { Options } from "./Interfaces";

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
    return '[]';
  }
  return result;
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

export function createInputElement(classNames: string, type: string): HTMLInputElement {
  const input = document.createElement('input');
  input.className = classNames;
  input.type = type;
  return input;
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

export const formatterForMoney = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  style: 'currency',
  currency: 'USD',
})