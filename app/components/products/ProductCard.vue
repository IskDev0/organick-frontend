<script setup lang="ts">
import type { IProduct } from "~/types/IProduct";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";

defineProps<{
  product: IProduct;
}>();
</script>

<template>
  <NuxtLink v-if="product" :to="`/products/${product.id}`">
    <article
      class="bg-[#F9F8F8] px-6 pt-6 pb-4 rounded-xl aspect-square dark:bg-zinc-900">
      <Badge>{{ product.category }}</Badge>
      <NuxtImg
        class="w-full max-w-[300px] max-h-[300px] mt-3 mb-1 object-cover aspect-square"
        :src="product.image"
        :alt="product.name" />
      <p class="font-semibold text-xl">{{ product.name }}</p>
      <Separator class="my-2" />
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span v-if="product.old_price" class="text-gray-400 line-through font-semibold"
            >${{ product.old_price }}</span
          >
          <span class="font-bold">${{ product.price }}</span>
        </div>
        <div class="flex">
          <Icon
            size="20"
            v-for="i in product.rating"
            :key="i"
            class="text-[#FFA858]"
            name="mynaui:star-solid" />
        </div>
      </div>
    </article>
  </NuxtLink>
</template>