import { books } from "./books";

describe('Check data', () => {
  
  it('should have 20 or more objects', () => {
    expect(books.length).toBeGreaterThanOrEqual(20);
  });
  
  it('should have no empty title', () => {
    books.forEach((val) => {
      expect(val.title).not.toHaveLength(0);
    });
  });

  it('Array of img with 2 or more url', () => {
    books.forEach((val) => {
      expect(val.book_image).toBeInstanceOf(Array);
      expect(val.book_image.length).toBeGreaterThan(1);
    });
  });

  it('Books should contain id property', () => {
    books.forEach((val) => {
      expect(val).toHaveProperty('id');
    });
  });
});