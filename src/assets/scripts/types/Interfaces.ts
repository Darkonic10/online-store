export interface book {
  id: number,
  publisher: string,
  description: string,
  price: number,
  title: string,
  author: string,
  genre: "Young Adult" | "Race and Civil Rights" | "Science" | "Hardcover Graphic Books" | "Paperback Business Books",
  book_image: string[],
  stock_balance: number,
}

export function getElementBySelector <T extends typeof Element>(
  element: DocumentFragment | HTMLElement | Document,
  type: T,
  selector: string): InstanceType<T> {
  const result = element.querySelector(selector);
  if (!result) throw new Error(`Selector ${selector} didn't match any elements.`);
  if (!(result instanceof type)) throw new TypeError(`Selector ${selector} have wrong type`);
  return result as InstanceType<T>;
}
