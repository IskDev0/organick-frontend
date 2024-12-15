<script setup lang="ts">
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field";
import { Button } from "~/components/ui/button";

const {removeFromCart} = useCartStore()
const { cartItems } = storeToRefs(useCartStore());

function countTotalItem(id: number, quantity: number): number {
  let item = cartItems.value.find((item) => item.id === id);
  if (item) {
    return parseInt(item.price) * quantity;
  }
  return 0;
}

const totalPrice = computed(() => {
  let total = 0;
  cartItems.value.forEach((item) => {
    total += countTotalItem(item.id, item.quantity);
  });
  return total.toFixed(2);
});
</script>

<template>
  <section v-if="cartItems.length > 0">
    <Table class="border">
      <TableHeader>
        <TableRow>
          <TableHead>№</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Total</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(item, index) in cartItems" :key="item.id">
          <TableCell class="font-medium">
            {{ index + 1 }}
          </TableCell>
          <TableCell>{{ item.name }}</TableCell>
          <TableCell>
            <p>
              <span class="text-gray-400 line-through"
                >${{ item.old_price }}</span
              >
              <span class="ml-2 font-bold">${{ item.price }}</span>
            </p>
          </TableCell>
          <TableCell>
            <div class="flex items-center gap-2">
              <NumberField v-model="item.quantity" :min="1" :max="item.stock">
                <NumberFieldContent>
                  <NumberFieldDecrement />
                  <NumberFieldInput />
                  <NumberFieldIncrement />
                </NumberFieldContent>
              </NumberField>
            </div>
          </TableCell>
          <TableCell>
            <span class="font-bold"
              >${{ countTotalItem(item.id, item.quantity).toFixed(2) }}</span
            >
          </TableCell>
          <TableCell>
            <Button @click="removeFromCart(item.id)" variant="ghost">
              <Icon name="ic:round-delete" />
            </Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
    <div class="flex justify-end mt-10">
      <div class="flex items-center gap-2">
        <span class="text-3xl">Total:</span>
        <span class="text-3xl font-bold">${{ totalPrice }}</span>
      </div>
    </div>
  </section>
  <h1 v-else class="text-5xl font-bold text-center">Cart is empty</h1>
  <NuxtLink v-if="cartItems.length > 0" to="/payment">
    <Button>Proceed to payment</Button>
  </NuxtLink>
</template>
