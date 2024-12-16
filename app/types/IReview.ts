import type { IPagination } from "~/types/IPagination";

export interface IReview {
  id: number;
  rating: number;
  comment: string;
  user_id: number;
  product_id: number;
  first_name: string;
  last_name: string;
  created_at: string;
}

export interface IReviewList {
  data: IReview[];
  pagination: IPagination;
}

export interface IProfileReview extends IReview {
  first_name: string;
  last_name: string;
  product_id: number;
  product_name: string;
  product_image: string;
  price: string;
  old_price: string;
}

export interface IProfileReviewList {
  data: IProfileReview[];
  pagination: IPagination;
}
