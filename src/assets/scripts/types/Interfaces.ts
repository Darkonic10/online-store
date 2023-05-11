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

type stringObject = { [key: string]: string };

type elementOptions = {
  className?: string,
  textContent?: string,
  href?: string,
  value?: string,
  type?: string,
  id?: string,
  innerText?: string,
  src?: string,
  placeholder?: string,
  alt?: string,
  min?: string,
}

type Options = Map<string, string>;

export { book, stringObject, Options, elementOptions }