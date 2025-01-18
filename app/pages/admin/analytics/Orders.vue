<script setup lang="ts">
import { DonutChart } from "~/components/ui/chart-donut";
import DataTable from "~/components/admin/orders/DataTable.vue";
import { useOrdersAnalyticsStore } from "~/stores/admin/analytics/orders-analytics";
import Calendar from "~/components/common/Calendar.vue";
import { ToggleGroup, ToggleGroupItem } from "~/components/ui/toggle-group";

definePageMeta({
  layout: "admin",
});

const { ordersAnalytics, analyticsPeriod, customAnalyticsPeriod } = storeToRefs(useOrdersAnalyticsStore());
const { getOrdersAnalytics } = useOrdersAnalyticsStore();

onMounted(async () => await getOrdersAnalytics());

const doughnutData = computed(() => {
  if (ordersAnalytics.value?.popularPaymentMethods) {
    return ordersAnalytics.value.popularPaymentMethods.map((method) => ({
      name: method.paymentMethod,
      count: method.count,
    }))
  }
});

function setPeriod(period: string | string[]): void {
  analyticsPeriod.value = period;
}

watch(analyticsPeriod, () => {
  getOrdersAnalytics();
  customAnalyticsPeriod.value = null
});

watch(customAnalyticsPeriod, () => {
  getOrdersAnalytics()
})
</script>

<template>
  <section v-if="ordersAnalytics">
    <div class="flex items-center justify-end gap-2 my-4">
      <ToggleGroup @update:modelValue="setPeriod($event)" type="single">
        <ToggleGroupItem value="day" aria-label="Select day">
          Day
        </ToggleGroupItem>
        <ToggleGroupItem value="week" aria-label="Select Week">
          Week
        </ToggleGroupItem>
        <ToggleGroupItem value="month" aria-label="Select Week">
          Month
        </ToggleGroupItem>
        <ToggleGroupItem value="year" aria-label="Select Week">
          Year
        </ToggleGroupItem>
      </ToggleGroup>
      <div>
        <Calendar v-model="customAnalyticsPeriod" range />
      </div>
    </div>
    <div class="flex items-center gap-4 mb-8">
      <article
        class="bg-white dark:bg-zinc-800 p-4 rounded-2xl flex-1 flex flex-col gap-2">
        <p>Total Revenue</p>
        <span class="font-bold text-2xl"
          >${{ ordersAnalytics.totalRevenue }}</span
        >
      </article>
      <article
        class="bg-white dark:bg-zinc-800 p-4 rounded-2xl flex-1 flex flex-col gap-2">
        <p>Average Checkout</p>
        <span class="font-bold text-2xl"
          >${{ ordersAnalytics.averageCheckout }}</span
        >
      </article>
      <article
        class="bg-white dark:bg-zinc-800 p-4 rounded-2xl flex-1 flex flex-col gap-2">
        <p>Total Orders</p>
        <span class="font-bold text-2xl">{{
          ordersAnalytics.totalOrders
        }}</span>
      </article>
    </div>
    <div class="flex gap-4">
      <div class="w-4/6">
        <DataTable
          v-if="ordersAnalytics.orders"
          :orders="ordersAnalytics.orders" />
      </div>
      <div class="w-2/6">
        <div class="bg-white dark:bg-zinc-800 p-4 rounded-2xl">
          <h2 class="text-2xl font-bold mb-4">Payment Methods</h2>
          <DonutChart
            v-if="doughnutData"
            index="name"
            :category="'count'"
            :data="doughnutData" />
          <h2 class="text-2xl font-bold my-4">Popular Categories</h2>
          <div class="flex flex-col gap-2">
            <article
              v-for="category in ordersAnalytics.popularCategories"
              :key="category.name"
              class="flex items-center justify-between bg-gray-50 dark:bg-zinc-700 p-2 rounded-lg">
              <p>{{ category.name }}</p>
              <p>{{ category.count }}</p>
            </article>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
