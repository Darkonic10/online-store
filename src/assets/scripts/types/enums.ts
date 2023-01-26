import { stringObject } from "./Interfaces";

export const delimeter = '↕';
export const reg = /[ &/.,-]/g

export const enum PageIds {
  MainPage = 'main-page',
  BasketPage = 'basket-page',
  BookPage = 'book-page',
  ErrorPage = 'error-page',
}

export const enum keysMain {
  Sort = 'sort',
  Genre = 'genre',
  Publisher = 'publisher',
  Search = 'search',
  MinPrice = 'minPrice',
  MaxPrice = 'maxPrice',
  MinStock = 'minStock',
  MaxStock = 'maxStock',
  Mode = 'mode',
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

export const enum promoCodes {
  RS = 'Rolling Scopes School',
  RS_DISCOUNT = 10,
  EPM = 'EPAM Systems',
  EPM_DISCOUNT = 10,
}

export const enum ErrorTypes {
  Error_404 = 404,
}