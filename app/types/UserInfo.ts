import type { IPagination } from "~/types/IPagination";

export interface UserInfo {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  image: string;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IRole {
  id: number;
  name: string;
}

export interface IUsersList {
  data: UserInfo[],
  pagination: IPagination
}