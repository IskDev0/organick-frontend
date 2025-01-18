<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DonutChart } from "@/components/ui/chart-donut";
import { useCustomersAnalyticsStore } from "~/stores/admin/analytics/customers-analytics";

definePageMeta({
  layout: "admin",
});

const { getCustomersAnalytics } = useCustomersAnalyticsStore();
const { customersAnalytics } = storeToRefs(useCustomersAnalyticsStore());

onMounted(() => getCustomersAnalytics());

const doughnutData = computed(() => {
  if (customersAnalytics.value) {
    return [
      {
        name: "New",
        percent: Number(customersAnalytics.value.customerSegments.newCustomersPercentage),
      },
      {
        name: "Returning",
        percent: Number(customersAnalytics.value.customerSegments.returningCustomersPercentage),
      },
    ];
  }
  return [];
});

const valueFormatter = (tick: number | Date) =>
  typeof tick === "number" ? `${tick}%` : "";
</script>

<template>
  <div
    v-if="customersAnalytics"
    class="flex flex-col items-start md:flex-row md:items-center justify-between rounded-lg p-4 bg-white dark:bg-zinc-800 my-4">
    <div class="flex flex-col gap-2 text-2xl">
      <h2>
        Total Customers:
        <span class="font-bold">{{ customersAnalytics.totalCustomers }}</span>
      </h2>
      <p>
        Average Spent Per Customer:
        <span class="font-bold"
          >${{ customersAnalytics.averageSpentPerCustomer }}</span
        >
      </p>
      <p>
        Repeat Purchase Rate:
        <span class="font-bold"
          >{{ customersAnalytics.repeatPurchaseRate }}%</span
        >
      </p>
    </div>
    <article class="w-1/4">
      <DonutChart
        index="name"
        :category="'percent'"
        :data="doughnutData"
        :value-formatter="valueFormatter" />
    </article>
  </div>
  <div
    v-if="customersAnalytics?.highActivityCustomers"
    class="bg-white dark:bg-zinc-800 p-4 rounded-lg">
    <h2 class="text-2xl font-bold mb-4">High Activity Customers</h2>
    <Table class="bg-white dark:bg-zinc-800 border">
      <TableHeader>
        <TableRow>
          <TableHead> Customer</TableHead>
          <TableHead> Total Orders</TableHead>
          <TableHead>Total Spent</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="customer in customersAnalytics.highActivityCustomers">
          <TableCell>
            <div class="flex items-center gap-4">
              <NuxtImg
                class="w-8 h-8 rounded-full"
                :src="customer.image"
                :alt="customer.name" />
              <span>{{ customer.name }}</span>
            </div>
          </TableCell>
          <TableCell>{{ customer.totalOrders }}</TableCell>
          <TableCell>${{ customer.totalSpent }}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>
