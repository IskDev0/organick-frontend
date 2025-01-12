<script setup lang="ts">
import { useOrdersStore } from "~/stores/admin/orders";
import DataTable from "~/components/admin/orders/DataTable.vue";
import OrdersFilter from "~/components/admin/orders/OrdersFilter.vue";
import { Input } from "~/components/ui/input";
import { Search } from "lucide-vue-next";
import { useDebounceFn } from "@vueuse/core";
import { Button } from "~/components/ui/button";

definePageMeta({
  layout: "admin",
});

const { orders, orderFilters } = storeToRefs(useOrdersStore());
const { getOrders, getExcelFile } = useOrdersStore();

onMounted(() => getOrders());

const handleSearch = useDebounceFn(() => {
  getOrders();
}, 500);
</script>

<template>
  <div class="flex items-center justify-between gap-10 my-4">
    <div class="relative w-full max-w-sm items-center">
      <Input
        v-model="orderFilters.search"
        @input="handleSearch"
        placeholder="Search..."
        class="pl-10" />
      <span
        class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
        <Search class="size-6 text-muted-foreground" />
      </span>
    </div>
    <div class="flex items-center gap-4">
      <Button @click="getExcelFile">
        <Icon class="mr-2" name="ri:file-excel-2-fill"/>
        <span>Export</span>
      </Button>
      <OrdersFilter />
    </div>
  </div>
  <DataTable :orders="orders" />
</template>
