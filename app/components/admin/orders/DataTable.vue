<script setup lang="ts">
import getDateFull from "~/utils/date/getDateFull";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { ChevronRight, Mail, Phone } from "lucide-vue-next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Badge } from "~/components/ui/badge";
import type { IOrder } from "~/types/admin/IOrder";

defineProps<{
  orders: IOrder[];
}>();

function setBadgeColor(status: string): string {
  switch (status) {
    case "pending":
      return "bg-yellow-500";
    case "delivered":
      return "bg-green-500";
    case "processing":
      return "bg-blue-500";
    case "paid":
      return "bg-emerald-500";
    case "canceled":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}
</script>

<template>
  <Table class="bg-white rounded-lg dark:bg-zinc-800">
    <TableHeader>
      <TableRow>
        <TableHead> ID</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Customer</TableHead>
        <TableHead>Amount</TableHead>
        <TableCell>Date</TableCell>
        <TableCell>Payment</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      <template v-if="orders.length > 0">
        <Collapsible v-for="order in orders" :key="order.id" as-child>
          <TableRow class="hover:bg-white dark:hover:bg-zinc-900">
            <TableCell>{{ order.id }}</TableCell>
            <TableCell>
              <Badge :class="setBadgeColor(order.status)">{{
                order.status
              }}</Badge>
            </TableCell>
            <TableCell
              >{{ order.user.firstName }} {{ order.user.lastName }}
            </TableCell>
            <TableCell>${{ order.totalAmount }}</TableCell>
            <TableCell>{{ getDateFull(order.createdAt) }}</TableCell>
            <TableCell>
              <Badge :class="setBadgeColor(order.payments[0].paymentStatus)"
                >{{ order.payments[0].paymentStatus }}
              </Badge>
            </TableCell>
            <CollapsibleTrigger class="w-full">
              <TableCell>
                <ChevronRight class="w-4 h-4" />
              </TableCell>
            </CollapsibleTrigger>
          </TableRow>
          <TableRow
            class="bg-gray-100 dark:bg-zinc-900 hover:bg-gray-100 dark:hover:bg-zinc-900">
            <TableCell class="p-0" colspan="12">
              <CollapsibleContent>
                <Table class="bg-white dark:bg-zinc-800 mt-4">
                  <TableHeader class="border">
                    <TableRow>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow
                      v-for="item in order.orderItems"
                      :key="item.productId">
                      <TableCell>
                        <NuxtLink
                          :to="`/products/${item.productId}`"
                          class="flex items-center gap-4">
                          <img
                            :src="item.product.image"
                            :alt="item.product.name"
                            class="w-16 h-16" />
                          {{ item.product.name }}
                        </NuxtLink>
                      </TableCell>
                      <TableCell>{{ item.quantity }}</TableCell>
                      <TableCell>${{ item.price }}</TableCell>
                      <TableCell
                        >${{
                          (item.price * item.quantity).toFixed(2)
                        }}</TableCell
                      >
                    </TableRow>
                  </TableBody>
                </Table>
                <p
                  class="m-4 bg-white dark:bg-zinc-800 p-4 font-bold text-xl text-right rounded-lg">
                  Total: ${{ order.totalAmount }}
                </p>
                <div class="flex gap-4 m-4">
                  <div class="bg-white dark:bg-zinc-800 p-4 flex-1 rounded-lg">
                    <p class="font-bold text-lg">Shipping address</p>
                    <p>{{ order.UserAddress.addressLine1 }}</p>
                    <p>
                      {{
                        order.UserAddress.addressLine2
                          ? order.UserAddress.addressLine2
                          : "N/A"
                      }}
                    </p>
                    <p>
                      {{ order.UserAddress.country }}
                      {{ order.UserAddress.city }},
                      {{ order.UserAddress.state }}
                      {{ order.UserAddress.zipCode }}
                    </p>
                  </div>
                  <div class="bg-white dark:bg-zinc-800 p-4 flex-1 rounded-lg">
                    <p class="font-bold text-lg">Contact info</p>
                    <div class="flex items-center gap-2">
                      <Phone :size="20" />
                      <a :href="`tel:${order.user.phone}`" target="_blank">{{
                        order.user.phone
                      }}</a>
                    </div>
                    <div class="flex items-center gap-2">
                      <Mail :size="20" />
                      <a :href="`mailto:${order.user.email}`" target="_blank">{{
                        order.user.email
                      }}</a>
                    </div>
                  </div>
                </div>
              </CollapsibleContent>
            </TableCell>
          </TableRow>
        </Collapsible>
      </template>
      <template v-else>
        <TableRow>
          <TableCell colspan="7">
            <p class="text-center">No orders found</p>
          </TableCell>
        </TableRow>
      </template>
    </TableBody>
  </Table>
</template>