export interface INews {
  id: number;
  title: string;
  content: string;
  user_id: number;
  preview: string;
  short_description: string;
  created_at: string;
  first_name: string;
  last_name: string;
}

export interface INewsList {
  data: INews[];
  paginationInfo: {
    currentPage: number;
    limit: number;
    totalProducts: number;
    totalPages: number;
  }
}