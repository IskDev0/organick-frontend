export interface IProduct {
  id: number;
  name: string;
  price: string;
  discount: string;
  old_price: string;
  rating: string;
  image: string;
  category: string;
  description: string;
}

export interface ICartItem extends IProduct {
  quantity: number;
}

export interface IProductFull extends IProduct {
  category_id: number;
  category_name: string;
  stock: number;
  quantity: number;
}

export interface IProductWithPagination {
  data: IProduct[];
  pagination: PaginationInfo;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalProducts: number;
  limit: number;
}
