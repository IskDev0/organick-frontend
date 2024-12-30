import type { IPagination } from "~/types/IPagination";

export interface IProduct {
  id?: string;
  name: string;
  price: string;
  discount: string;
  categoryId?: number | null;
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
  pagination: IPagination;
}
