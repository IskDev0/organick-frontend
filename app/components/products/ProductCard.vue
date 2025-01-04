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
      class="bg-[#F9F8F8] px-6 pt-6 pb-4 rounded-xl aspect-square dark:bg-zinc-900 flex flex-col items-center md:items-start">
      <div class="flex items-center justify-between w-full">
        <Badge class="self-start">{{ product.category }}</Badge>
        <Badge
          v-if="product.discount !== 0"
          class="self-start bg-red-600 hover:bg-red-600"
          >- {{ product.discount }}%
        </Badge>
      </div>
      <NuxtImg
        class="w-full max-w-[300px] max-h-[300px] mt-3 mb-1 object-cover aspect-square"
        :src="product.image"
        :alt="product.name" />
      <p class="font-semibold text-xl">{{ product.name }}</p>
      <Separator class="my-2" />
      <div
        class="w-full flex items-center flex-row md:flex-col md:items-start lg:flex-row justify-between">
        <div class="flex items-center gap-2">
          <span
            v-if="product.oldPrice"
            class="text-gray-400 line-through font-semibold"
            >${{ product.oldPrice }}</span
          >
          <span class="font-bold">${{ product.price }}</span>
        </div>
        <div class="flex">
          <Icon
            size="20"
            v-for="i in 5"
            :key="i"
            :class="
              i <= parseInt(product.rating) ? 'text-[#FFA858]' : 'text-gray-400'
            "
            name="mynaui:star-solid" />
        </div>
      </div>
    </article>
  </NuxtLink>
</template>