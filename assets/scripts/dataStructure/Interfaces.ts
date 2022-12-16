interface book {
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

export {book}
