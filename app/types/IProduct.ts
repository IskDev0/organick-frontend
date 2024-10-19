export interface IProduct {
  id: number;
  name: string;
  price: string;
  discount: string;
  old_price: string;
  rating: string;
  image: string;
  category: string;
}

export interface IProductWithPagination {
  data: IProduct[];
  pagination: PaginationInfo
}

export interface PaginationInfo {
    currentPage: number,
    totalPages: number,
    totalProducts: number,
    limit: number
}