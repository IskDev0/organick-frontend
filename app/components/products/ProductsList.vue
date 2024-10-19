<script setup lang="ts">
import type { IProduct } from "~/types/IProduct";
import ProductCard from "~/components/products/ProductCard.vue";

defineProps<{
  products: IProduct[]
}>()
</script>

<template>
<div v-auto-animate class="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-10">
  <ProductCard v-for="product in products" :key="product.id" :product="product" />
</div>
</template>