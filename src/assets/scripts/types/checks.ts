export function getElementBySelector <T extends typeof Element>(
  element: DocumentFragment | HTMLElement | Document,
  type: T,
  selector: string): InstanceType<T> {
  const result = element.querySelector(selector);
  if (!result) throw new Error(`Selector ${selector} didn't match any elements.`);
  if (!(result instanceof type)) throw new TypeError(`Selector ${selector} have wrong type`);
  return result as InstanceType<T>;
}