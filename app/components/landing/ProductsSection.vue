<script setup lang="ts">
import { Button } from "~/components/ui/button";
import ProductListSkeleton from "~/components/products/ProductListSkeleton.vue";
import { useProductsStore } from "~/stores/products";
import type { IProduct, IProductWithPagination, PaginationInfo } from "~/types/IProduct";

const { $apiClient } = useNuxtApp();

const isLoading = ref<boolean>(false);
const products = ref<IProduct[]>([])
const paginationInfo = ref<PaginationInfo>();

async function getProducts(): Promise<void> {
  try {
    const {data, pagination} = await $apiClient<IProductWithPagination>(`/products?limit=12&page=${paginationInfo.value?.currentPage || 1}`);
    products.value = data;
    paginationInfo.value = pagination
  }catch (error) {
    console.error(error);
  }
}

onMounted(() => getProducts());

async function loadMore(): Promise<void> {
  paginationInfo.value!.currentPage++;
  isLoading.value = true;
  await getProducts();
  isLoading.value = false;
}

const reachedLimit = computed(() => {
  return paginationInfo.value?.totalPages === paginationInfo.value?.currentPage;
});
</script>

<template>
  <section class="container mb-10">
    <div class="flex flex-col items-center gap-2 mb-10">
      <h3 class="text-3xl font-yellowtail text-[#7EB693]">Categories</h3>
      <p class="font-extrabold text-5xl">Our Products</p>
    </div>
    <ProductsList v-if="products.length > 0" :products="products" />
    <ProductListSkeleton v-else />
    <div v-if="!reachedLimit" class="flex justify-center">
      <Button :disabled="isLoading" size="lg" @click="loadMore"
        >{{ isLoading ? "Loading..." : "Load More" }}
      </Button>
    </div>
  </section>
</template>