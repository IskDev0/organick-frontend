import type { IPagination } from "~/types/IPagination";

export interface IOrder {
  id: string;
  totalAmount: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  UserAddress: UserAddress;
  orderItems: IOrderItem[];
  payments: [
    {
      paymentMethod: string;
      paymentStatus: string;
    },
  ];
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface UserAddress {
  id: string;
  addressLine1: string;
  addressLine2: any;
  city: string;
  zipCode: string;
  country: string;
  state: string
}

export interface IOrderItem {
  productId: string;
  quantity: number;
  price: string;
  product: {
    id: string;
    name: string;
    image: string;
    phone: string;
  };
}

export interface IOrderList {
  data: IOrder[];
  pagination: IPagination;
}
