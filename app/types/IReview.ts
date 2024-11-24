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
  pagination: IPagination
}
