export const useProductAnalyticsStore = defineStore('product-analytics', () => {

  const { $apiClient } = useNuxtApp()

  const productsAnalyticsInfo = ref()
  const analyticsPeriod = ref()
  const customAnalyticsPeriod = ref()
  const isAnalyticsLoading = ref(false)

  const getProductsAnalyticsInfo = async () => {
    try {
      isAnalyticsLoading.value = true
      let query = customAnalyticsPeriod.value ? `interval=custom&startDate=${customAnalyticsPeriod.value[0]}&endDate=${customAnalyticsPeriod.value[1]}` : `interval=${analyticsPeriod.value}`
      productsAnalyticsInfo.value = await $apiClient(`/analytics/products?${query}`)
    } catch (error) {
      console.error(error)
    } finally {
      isAnalyticsLoading.value = false
    }
  }

  return {
    productsAnalyticsInfo,
    analyticsPeriod,
    customAnalyticsPeriod,
    isAnalyticsLoading,
    getProductsAnalyticsInfo
  }
})