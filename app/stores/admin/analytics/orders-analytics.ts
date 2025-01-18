import type { OrderAnalyticsResponse } from "~/types/admin/OrderAnalyticsResponse";

export const useOrdersAnalyticsStore = defineStore("orders-analytics", () => {
  const { $apiClient } = useNuxtApp();

  const ordersAnalytics = ref<OrderAnalyticsResponse>();
  const customAnalyticsPeriod = ref();
  const analyticsPeriod = ref();
  const isAnalyticsLoading = ref(false)

  const getOrdersAnalytics = async () => {
    try {
      let query = customAnalyticsPeriod.value
        ? `interval=custom&startDate=${customAnalyticsPeriod.value[0]}&endDate=${customAnalyticsPeriod.value[1]}`
        : `interval=${analyticsPeriod.value}`;
      ordersAnalytics.value = await $apiClient(`/analytics/orders?${query}`);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    ordersAnalytics,
    analyticsPeriod,
    customAnalyticsPeriod,
    getOrdersAnalytics,
  };
});
