<script setup lang="ts">
import { Button } from "~/components/ui/button";
import type { IProduct, IProductWithPagination } from "~/types/IProduct";
import { toast } from "~/components/ui/toast";
import ProductListSkeleton from "~/components/products/ProductListSkeleton.vue";

const page = ref<number>(1);
const isLoading = ref<boolean>(false);
const products = ref<IProduct[]>([]);
const reachedLimit = ref<boolean>(false);

//TODO: create http client and move login to store
async function loadProducts(): Promise<void> {
  try {
    const response = await $fetch<IProductWithPagination>(
      `http://localhost:8080/api/v1/products?page=${page.value}`,
    );
    if (response.data?.length > 0) {
      products.value = products.value.concat(response.data);
    }

    if (!Object.keys(response).includes("data")) {
      reachedLimit.value = true;
    }
  }catch (error) {
    console.error(error.data);
    toast({
      title: "Error",
      description: error.data,
      variant: "destructive",
    })
  }
}

onMounted(() => {
  loadProducts();
});

async function loadMore() {
  page.value++;
  isLoading.value = true;
  await loadProducts();
  isLoading.value = false;
}
</script>

<template>
  <section class="container mb-10">
    <div class="flex flex-col items-center gap-2 mb-10">
      <h3 class="text-3xl font-yellowtail text-[#7EB693]">Categories</h3>
      <p class="font-extrabold text-5xl">Our Products</p>
    </div>
    <ProductsList v-if="products.length > 0" :products="products" />
    <ProductListSkeleton v-else/>
    <div v-if="!reachedLimit" class="flex justify-center">
      <Button :disabled="isLoading" size="lg" @click="loadMore"
        >{{ isLoading ? "Loading..." : "Load More" }}
      </Button>
    </div>
  </section>
</template>