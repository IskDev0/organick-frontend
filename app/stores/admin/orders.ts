import type { IOrder, IOrderList } from "~/types/admin/IOrder";
import type { IPagination } from "~/types/IPagination";
import handleFileDownload from "~/utils/handleFileDownload";
import handleFilters from "~/utils/handleFilters";

export const useOrdersStore = defineStore("orders", () => {
  const { $apiClient } = useNuxtApp();

  const orders = ref<IOrder[]>([]);
  const orderPaginationInfo = ref<IPagination>();

  const orderFilters = ref({
    search: null,
    status: null,
    paymentStatus: null,
    date: null,
    minPrice: null,
    maxPrice: null,
  });

  const getOrders = async (): Promise<void> => {

    let params = handleFilters({
      ...orderFilters.value,
      startDate: orderFilters.value.date?.[0],
      endDate: orderFilters.value.date?.[1],
    });

    try {
      const { data, pagination } = await $apiClient<IOrderList>(
        "/orders?" + params.toString(),
      );
      orders.value = data;
      orderPaginationInfo.value = pagination;
    } catch (error) {
      console.error(error);
    }
  };

  const clearFilters = (): void => {
    orderFilters.value = {
      search: null,
      status: null,
      paymentStatus: null,
      date: null,
      minPrice: null,
      maxPrice: null,
    };
  };

  const getExcelFile = async (): Promise<void> => {

    let params = handleFilters(orderFilters.value);

    try {
      let blob = await $apiClient(`/orders/excel?${params.toString()}`, {
        responseType: "blob",
      });

      handleFileDownload(blob, "orders");
    } catch (error) {
      console.error(error);
    }
  };

  return { orders, orderFilters, getOrders, clearFilters, getExcelFile };
});
