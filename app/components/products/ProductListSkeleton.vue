<script setup lang="ts">
import ProductCardSkeleton from "~/components/products/ProductCardSkeleton.vue";
</script>

<template>
  <div
    class="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-10">
    <ProductCardSkeleton v-for="i in 12" :key="i" />
  </div>
</template>
