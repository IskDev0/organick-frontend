<script setup lang="ts">
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "~/components/ui/button";
import { Filter, FilterX } from "lucide-vue-next";
import { Input } from "~/components/ui/input";
import Calendar from "~/components/common/Calendar.vue";
import { useOrdersStore } from "~/stores/admin/orders";

const orderStatuses = [
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Paid",
    value: "paid",
  },
  {
    label: "Processing",
    value: "processing",
  },
  {
    label: "Shipped",
    value: "shipped",
  },
  {
    label: "Delivered",
    value: "delivered",
  },
];

const paymentStatuses = [
  {
    label: "Paid",
    value: "paid",
  },
  {
    label: "Pending",
    value: "pending",
  },
];

const { orderFilters } = storeToRefs(useOrdersStore());
const { getOrders, clearFilters } = useOrdersStore();
</script>

<template>
  <Sheet>
    <SheetTrigger>
      <Button variant="outline">
        <Filter />
      </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Filter</SheetTitle>
      </SheetHeader>
      <div class="flex flex-col gap-2 mt-4">
        <div class="flex flex-col gap-2">
          <span class="text-xs">Status</span>
          <Select v-model="orderFilters.status">
            <SelectTrigger>
              <SelectValue placeholder="Select a status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="status in orderStatuses"
                  :key="status.value"
                  :value="status.value">
                  {{ status.label }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-xs">Payment Status</span>
          <Select v-model="orderFilters.paymentStatus">
            <SelectTrigger>
              <SelectValue placeholder="Select payment status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  v-for="status in paymentStatuses"
                  :key="status.value"
                  :value="status.value">
                  {{ status.label }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="flex items-center gap-4">
          <div class="flex flex-col gap-2">
            <span class="text-xs">Price from</span>
            <div class="flex items-center gap-4">
              <Input v-model="orderFilters.minPrice" placeholder="From" />
            </div>
          </div>
          <div class="flex flex-col gap-2">
            <span class="text-xs">Price to</span>
            <div class="flex items-center gap-4">
              <Input v-model="orderFilters.maxPrice" placeholder="To" />
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-xs">Date</span>
          <Calendar v-model="orderFilters.date" range />
        </div>
        <Button @click="clearFilters" variant="outline">
          <FilterX class="mr-2" :size="20" />
          <span>Clear</span>
        </Button>
        <Button @click="getOrders"> Apply</Button>
      </div>
    </SheetContent>
  </Sheet>
</template>
