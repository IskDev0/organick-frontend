<script setup lang="ts">
import { useProductAnalyticsStore } from "~/stores/admin/analytics/products-analytics";
import { MoveDownRight, MoveUpRight } from "lucide-vue-next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import Calendar from "~/components/common/Calendar.vue";
import { Skeleton } from "~/components/ui/skeleton";
import getDate from "~/utils/date/getDate";

definePageMeta({
  layout: "admin",
});

const { productsAnalyticsInfo, analyticsPeriod,customAnalyticsPeriod, isAnalyticsLoading } =
  storeToRefs(useProductAnalyticsStore());
const { getProductsAnalyticsInfo } = useProductAnalyticsStore();

onMounted(() => getProductsAnalyticsInfo());

function setPeriod(period: string | string[]): void {
  analyticsPeriod.value = period;
}

watch(analyticsPeriod, () => {
  getProductsAnalyticsInfo();
  customAnalyticsPeriod.value = null
});

watch(customAnalyticsPeriod, () => {
  getProductsAnalyticsInfo()
})

const periodText = computed(() => {
  if (productsAnalyticsInfo.value) {
    switch (productsAnalyticsInfo.value.interval) {
      case "day":
        return "Daily"
      case "week":
        return "Weekly"
      case "month":
        return "Monthly"
      case "year":
        return "Yearly"
      case "custom":
        return `${getDate(productsAnalyticsInfo.value.startDate)} - ${getDate(productsAnalyticsInfo.value.endDate)}`
      default:
        return "Weekly"
    }
  }
})
</script>

<template>
  <section v-if="productsAnalyticsInfo">
    <div class="flex items-center justify-end gap-2">
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
    <div v-if="!isAnalyticsLoading" class="flex flex-col items-stretch md:flex-row md:items-center gap-4 my-4">
      <article class="bg-white dark:bg-zinc-800 p-4 rounded-lg flex-1">
        <p>{{periodText}} Revenue</p>
        <p class="text-2xl font-bold">
          ${{ productsAnalyticsInfo.totalRevenue }}
        </p>
        <div class="flex items-center gap-2">
          <p>{{ productsAnalyticsInfo.revenueChange }}</p>
          <MoveUpRight
            :size="20"
            class="text-green-500"
            v-if="parseFloat(productsAnalyticsInfo.revenueChange) > 0" />
          <MoveDownRight
            :size="20"
            class="text-red-500"
            v-else-if="parseFloat(productsAnalyticsInfo.revenueChange) < 0" />
        </div>
      </article>
      <article class="bg-white dark:bg-zinc-800 p-4 rounded-lg flex-1">
        <p>{{periodText}} Sales</p>
        <p class="text-2xl font-bold">{{ productsAnalyticsInfo.totalSales }}</p>
        <div class="flex items-center gap-2">
          <p>{{ productsAnalyticsInfo.salesChange }}</p>
          <MoveUpRight
            :size="20"
            class="text-green-500"
            v-if="parseFloat(productsAnalyticsInfo.salesChange) > 0" />
          <MoveDownRight
            :size="20"
            class="text-red-500"
            v-else-if="parseFloat(productsAnalyticsInfo.salesChange) < 0" />
        </div>
      </article>
    </div>
    <div v-else class="flex items-center gap-4 my-4">
      <Skeleton class="w-1/2 h-20" />
      <Skeleton class="w-1/2 h-20" />
    </div>

    <div class="flex flex-col md:flex-row gap-2 xl:gap-12">
      <div class="w-full lg:w-1/2 xl:w-4/6">
        <Table v-if="!isAnalyticsLoading" class="bg-white dark:bg-zinc-800">
          <TableHeader>
            <TableRow>
              <TableCell>№</TableCell>
              <TableHead>Product</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Sold Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <template v-if="productsAnalyticsInfo.productAnalytics.length > 0">
              <TableRow
                v-for="(
                  product, index
                ) in productsAnalyticsInfo.productAnalytics">
                <TableCell>{{ index + 1 }}</TableCell>
                <TableCell>
                  <div class="flex items-center gap-2">
                    <NuxtImg
                      class="h-12 w-12 rounded-full object-cover"
                      :src="product.image"
                      :alt="product.name" />
                    <span>{{ product.name }}</span>
                  </div>
                </TableCell>
                <TableCell>${{ product.totalRevenue.toFixed(2) }}</TableCell>
                <TableCell>{{ product.totalSold }}</TableCell>
              </TableRow>
            </template>
            <template v-else>
              <TableRow>
                <TableCell colspan="4">
                  <p class="text-center">No Data</p>
                </TableCell>
              </TableRow>
            </template>
          </TableBody>
        </Table>
        <div v-else class="flex flex-col gap-2">
          <Skeleton class="h-12 w-full" v-for="i in 10" :key="i" />
        </div>
      </div>
      <div class="w-full lg:w-1/2 xl:w-2/6 bg-white dark:bg-zinc-800 p-4 rounded-lg">
        <h2 class="text-2xl font-bold mb-4">Top Products</h2>
        <div
          v-if="
            productsAnalyticsInfo.topProducts.length > 0 && !isAnalyticsLoading
          "
          class="flex flex-col gap-4">
          <article
            class="bg-gray-50 dark:bg-zinc-700 p-2 flex items-center justify-between rounded-lg"
            v-for="product in productsAnalyticsInfo.topProducts">
            <div class="flex items-center gap-2">
              <NuxtImg
                class="h-12 w-12 rounded-full object-cover"
                :src="product.image"
                :alt="product.name" />
              <span>{{ product.name }}</span>
            </div>
            <div class="flex flex-col">
              <span
                >Total Sold:
                <span class="font-bold">{{ product.totalSold }}</span></span
              >
              <p>
                Total Revenue:
                <span class="font-bold"
                  >${{ product.totalRevenue.toFixed(2) }}</span
                >
              </p>
            </div>
          </article>
        </div>
        <div v-if="isAnalyticsLoading" class="flex flex-col gap-2">
          <Skeleton class="h-12 w-full" v-for="i in 10" :key="i" />
        </div>
        <p v-else-if="productsAnalyticsInfo.topProducts.length === 0" class="text-center">No Data</p>
      </div>
    </div>
  </section>
</template>
