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
  UserAddress: IOrderShippingAddress;
}

interface IOrderItem {
  quantity: number;
  productId: number;
  product: {
    name: string;
    image: string;
  };
  price: number;
}

interface IOrderShippingAddress {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
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
  if (order) {
    return `${order.UserAddress.addressLine1}, ${order.UserAddress.city}, ${order.UserAddress.state}, ${order.UserAddress.zipCode}, ${order.UserAddress.country}`;
  }
  return "";
}

function getItemTotal(item: IOrderItem): string {
  return (item.quantity * item.price).toFixed(2);
}
</script>

<template>
  <section v-if="orders.length > 0">
    <div class="flex flex-col gap-4">
      <Accordion
        class="bg-gray-100 dark:bg-zinc-900 p-4 rounded-lg"
        v-for="order in orders"
        :key="order.id"
        type="single"
        collapsible>
        <AccordionItem :value="String(order.id)">
          <AccordionTrigger class="hover:no-underline">
            <div
              class="flex items-center justify-between w-full mr-4 font-bold">
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
                <TableRow v-for="item in order.orderItems" :key="item.id">
                  <TableCell>
                    <NuxtLink
                      :to="`/products/${item.productId}`"
                      class="flex items-center gap-4">
                      <img
                        :src="item.product.image"
                        :alt="item.product.name"
                        class="w-16 h-16" />
                      <p>{{ item.product.name }}</p>
                    </NuxtLink>
                  </TableCell>
                  <TableCell>{{ item.quantity }}</TableCell>
                  <TableCell>${{ item.price }}</TableCell>
                  <TableCell>${{ getItemTotal(item) }}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div class="flex items-center justify-between w-full">
              <p class="text-sm text-muted-foreground">
                Ordered on {{ getDate(order.created_at) }}
              </p>
              <p class="font-bold text-lg">${{ order.totalAmount }}</p>
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
    </div>
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
  </section>
 <div v-else class="flex flex-col items-center justify-center h-full">
   <p class="text-3xl font-bold text-center mt-10">No orders yet</p>
 </div>
</template>