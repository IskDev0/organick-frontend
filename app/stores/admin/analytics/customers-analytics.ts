export const useCustomersAnalyticsStore = defineStore("customers-analytics", () => {
  const { $apiClient } = useNuxtApp();

  const customersAnalytics = ref();

  const getCustomersAnalytics = async ():Promise<void> => {
    try {
      customersAnalytics.value = await $apiClient("/analytics/customers");
    } catch (error) {
      console.error(error);
    }
  };

  return {
    customersAnalytics,
    getCustomersAnalytics
  }
})