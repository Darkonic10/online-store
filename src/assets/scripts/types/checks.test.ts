import { checkBookId, createElementByTag, formatterUSD, getBookID, getHash, getLocalStorage, getMainAddress, getMainOptions, resetMainOptions } from "./checks"

const fakeLocalStorage = {
  getItem: (key: string) => {
    return 'QuillTree↕SimonSchuster'
  },
  length: 1,

  clear: () => {
    return undefined;
  },

  key: () => {
    return null
  },

  removeItem: () => {
    return null
  },

  setItem: () => {
    return null
  },
}

describe('Check function tests', () => {
  it('should check is this book id exist', () => {
    expect(checkBookId(5)).toBeDefined();
  }, 3000);

  it('should get book id if it exists', () => {
    const options = new Map([['id', '18']]);
    const result = '18'
    expect(getBookID(options)).toMatchSnapshot(result);
  }, 3000);

  it('should return formatted price', () => {
    const price = 17;
    const result = '$17.00'
    expect(formatterUSD.format(price)).toEqual(result);
  }, 3000);

  it('should return clean page address without query parameters', () => {
    const url = '#main-page?maxStock=11&publisher=QuillTree↕SimonSchuster';
    const result = 'main-page'
    expect(getHash(url)).toEqual(result);
    expect(typeof getHash(url) === 'string').toBeTruthy();
  }, 3000);

  it('should return HTML element of given type', () => {
    expect(getLocalStorage(fakeLocalStorage, 'publisher')).toEqual('QuillTree↕SimonSchuster');
  }, 3000);
});

test('throw an error if no such a book was found', () => {
  expect(() => {checkBookId(0)}).toThrowError();
});