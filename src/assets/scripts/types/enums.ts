import { stringObject } from "./Interfaces";

export const enum PageIds {
  MainPage = 'main-page',
  BasketPage = 'basket-page',
  BookPage = 'book-page',
}

export const enum keyToMainOptions {
  Sort = 'sort',
  Genre = 'genre',
  Publisher = 'publisher',
}

export const SortOptions: stringObject[] = [
  {
    name: 'Choose sort',
    id: 'none'
  },
  {
    name: 'Title, Asc',
    id: 'titleAsc'
  },
  {
    name: 'Title, Desc',
    id: 'titleDesc'
  },
  {
    name: 'Author, Asc',
    id: 'authorAsc'
  },
  {
    name: 'Author, Desc',
    id: 'authorDesc'
  },
  {
    name: 'Price, Asc',
    id: 'priceAsc'
  },
  {
    name: 'Price, Desc',
    id: 'priceDesc'
  },
]

export const enum ErrorTypes {
  Error_404 = 404,
}