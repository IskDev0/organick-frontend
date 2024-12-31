import type { IPagination } from "~/types/IPagination";

export interface INews {
  id: string;
  title: string;
  content: string;
  userId: number;
  preview: string;
  shortDescription: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
  };
}

export interface INewsList {
  data: INews[];
  pagination: IPagination;
}

export interface IAuthor {
  id: number;
  firstName: string;
  lastName: string;
}
