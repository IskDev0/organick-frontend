<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import getDate from "../../utils/date/getDate";
import { useToast } from "~/components/ui/toast";
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "~/components/ui/pagination";
import { Button } from "~/components/ui/button";

definePageMeta({
  layout: "profile",
  middleware: "access",
});

const { $apiClient } = useNuxtApp();

const { toast } = useToast();

interface IOrder {
  id: number;
  user_id: number;
  total_amount: string;
  status: string;
  created_at: string;
  updated_at: string;
  payment_method: string;
  order_items: IOrderItem[];
  shipping_address: IOrderShippingAddress;
}

interface IOrderItem {
  quantity: number;
  product_id: number;
  product_name: string;
  product_image: string;
  price: number;
}

interface IOrderShippingAddress {
  address_line1: string;
  address_line2: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
}

const orders = ref<IOrder[]>([]);
const paginationInfo = ref({
  currentPage: 1,
  totalPages: 0,
  totalOrders: 0,
  limit: 10,
});

async function getUserOrders() {
  try {
    const { data, pagination } = await $apiClient(
      `/users/orders?page=${paginationInfo.value.currentPage}&limit=10`,
    );
    if (data) {
      orders.value = data;
      paginationInfo.value = pagination;
    } else {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    }
  } catch (error) {
    console.error(error);
    toast({
      title: "Error",
      description: error.data.message,
      variant: "destructive",
    });
  }
}

onMounted(() => getUserOrders());

function setBadgeColor(status: string): string {
  switch (status) {
    case "pending":
      return "bg-yellow-500 hover:bg-yellow-600";
    case "delivered":
      return "bg-green-500 hover:bg-green-600";
    case "cancelled":
      return "bg-red-500 hover:bg-red-600";
    default:
      return "bg-gray-500";
  }
}

function getShippingAddress(order: IOrder): string {
  return `${order.shipping_address.address_line1}, ${order.shipping_address.city}, ${order.shipping_address.state}, ${order.shipping_address.postal_code}, ${order.shipping_address.country}`;
}

function getItemTotal(item: IOrderItem): string {
  return (item.quantity * item.price).toFixed(2);
}
</script>

<template>
  <section class="flex flex-col gap-4">
    <Accordion
      class="bg-gray-100 dark:bg-zinc-900 p-4 rounded-lg"
      v-for="order in orders"
      :key="order.id"
      type="single"
      collapsible>
      <AccordionItem :value="String(order.id)">
        <AccordionTrigger class="hover:no-underline">
          <div class="flex items-center justify-between w-full mr-4 font-bold">
            <p>Order #{{ order.id }}</p>
            <Badge :class="setBadgeColor(order.status)">{{
              order.status
            }}</Badge>
          </div>
        </AccordionTrigger>
        <AccordionContent class="flex flex-col gap-4">
          <Table class="bg-white rounded-lg dark:bg-zinc-800">
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow
                v-for="item in order.order_items"
                :key="item.product_id">
                <TableCell>
                  <NuxtLink
                    :to="`/products/${item.product_id}`"
                    class="flex items-center gap-4">
                    <img
                      :src="item.product_image"
                      :alt="item.product_name"
                      class="w-16 h-16" />
                    <p>{{ item.product_name }}</p>
                  </NuxtLink>
                </TableCell>
                <TableCell>{{ item.quantity }}</TableCell>
                <TableCell>${{ item.price.toFixed(2) }}</TableCell>
                <TableCell>${{ getItemTotal(item) }}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div class="flex items-center justify-between w-full">
            <p class="text-sm text-muted-foreground">
              Ordered on {{ getDate(order.created_at) }}
            </p>
            <p class="font-bold text-lg">${{ order.total_amount }}</p>
          </div>
          <div
            class="flex flex-col gap-2 bg-white dark:bg-zinc-800 p-4 rounded-lg">
            <p class="font-bold text-lg">Shipping address</p>
            <p class="text-sm text-muted-foreground">
              {{ getShippingAddress(order) }}
            </p>
            <p class="font-bold text-lg">Payment method</p>
            <p class="text-sm text-muted-foreground">
              {{ order.payment_method }}
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </section>
  <Pagination
    class="mt-4"
    v-if="orders.length > 0"
    v-slot="{ page }"
    :total="paginationInfo?.totalOrders"
    :items-per-page="paginationInfo?.limit"
    :sibling-count="1"
    show-edges
    :default-page="1">
    <PaginationList
      v-slot="{ items }"
      class="flex items-center justify-center gap-1">
      <PaginationFirst
        @click="handlePagination('first', getUserOrders, paginationInfo)" />
      <PaginationPrev
        @click="handlePagination('prev', getUserOrders, paginationInfo)" />

      <template v-for="(item, index) in items">
        <PaginationListItem
          v-if="item.type === 'page'"
          :key="index"
          :value="item.value"
          as-child>
          <Button
            @click="
              handlePagination(
                'specific',
                getUserOrders,
                paginationInfo,
                item.value,
              )
            "
            class="w-10 h-10 p-0"
            :variant="item.value === page ? 'default' : 'outline'">
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext
        @click="handlePagination('next', getUserOrders, paginationInfo)" />
      <PaginationLast
        @click="handlePagination('last', getUserOrders, paginationInfo)" />
    </PaginationList>
  </Pagination>
</template>