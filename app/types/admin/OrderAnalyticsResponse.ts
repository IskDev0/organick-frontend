import type { IOrder } from "~/types/admin/IOrder";

export interface OrderAnalyticsResponse {
  interval: string;
  startDate: string;
  endDate: string;
  orders: IOrder[];
  totalOrders: number;
  totalRevenue: number;
  averageCheckout: number;
  popularCategories: PopularCategory[];
  popularPaymentMethods: PopularPaymentMethod[];
  popularDeliveryCountries: PopularDeliveryCountry[];
}

export interface PopularCategory {
  name: string;
  count: number;
}

export interface PopularPaymentMethod {
  paymentMethod: string;
  count: number;
}

export interface PopularDeliveryCountry {
  country: string;
  count: number;
}
