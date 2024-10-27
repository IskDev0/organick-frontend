<script setup lang="ts">
import { Button } from "~/components/ui/button";
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Input} from "~/components/ui/input";
import ProductListSkeleton from "~/components/products/ProductListSkeleton.vue";
import { useToast } from "~/components/ui/toast";
import { useDebounceFn } from "@vueuse/core";

const { $apiClient } = useNuxtApp();
const {toast} = useToast()

const { products, paginationInfo, filters } = storeToRefs(useProductsStore());
const { getProducts, searchProducts } = useProductsStore();

onMounted(() => {
  searchProducts()
  getCategories();
});

async function goNext(): Promise<void> {
  paginationInfo.value!.currentPage++;
  await searchProducts();
}

async function goPrev(): Promise<void> {
  paginationInfo.value!.currentPage--;
  await searchProducts();
}

async function goFirst(): Promise<void> {
  paginationInfo.value!.currentPage = 1;
  await searchProducts();
}

async function goLast(): Promise<void> {
  paginationInfo.value!.currentPage = paginationInfo.value!.totalPages;
  await searchProducts();
}

async function goPage(page: number): Promise<void> {
  paginationInfo.value!.currentPage = page;
  await searchProducts();
}

const categories = ref<{ id: number; name: string }[]>([]);

async function getCategories(): Promise<void> {
  try {
    const data = await $apiClient<{ id: number; name: string }[]>("/products/categories");
    categories.value = [ { id: 0, name: "All" }, ...data];
  } catch (error) {
    console.error(error);
  }
}

watch(() => filters.value.category_id, () => {
  paginationInfo.value!.currentPage = 1
  searchProducts()
}, {deep: true})

const handleDebounceSearch = useDebounceFn(() => {
  paginationInfo.value!.currentPage = 1
  searchProducts()
}, 500)

</script>

<template>
  <div class="flex items-center justify-between mb-4">
    <h1 class="text-3xl font-bold">Products</h1>
    <div class="w-1/2 flex items-center gap-4">
      <Select v-model="filters.category_id">
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{category.name}}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div class="relative w-full max-w-sm items-center">
      <Input v-model="filters.name" @input="handleDebounceSearch" type="text" placeholder="Search..." class="pl-10" />
      <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
      <Icon name="ic:baseline-search" class="size-6 text-muted-foreground dark:text-muted" />
    </span>
    </div>
    </div>
  </div>
  <ProductsList v-if="products.length > 0" :products="products" />
  <ProductListSkeleton v-else />
  <Pagination
    v-if="products.length > 0"
    v-slot="{ page }"
    :total="paginationInfo?.totalProducts"
    :items-per-page="paginationInfo?.limit"
    :sibling-count="1"
    show-edges
    :default-page="1">
    <PaginationList
      v-slot="{ items }"
      class="flex items-center justify-center gap-1">
      <PaginationFirst @click="goFirst" />
      <PaginationPrev @click="goPrev" />

      <template v-for="(item, index) in items">
        <PaginationListItem
          v-if="item.type === 'page'"
          :key="index"
          :value="item.value"
          as-child>
          <Button
            @click="goPage(item.value)"
            class="w-10 h-10 p-0"
            :variant="item.value === page ? 'default' : 'outline'">
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext @click="goNext" />
      <PaginationLast @click="goLast" />
    </PaginationList>
  </Pagination>
</template>
