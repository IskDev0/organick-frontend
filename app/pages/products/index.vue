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
import { useDebounceFn } from "@vueuse/core";

const { $apiClient } = useNuxtApp();

const { products, productsPaginationInfo, filters } = storeToRefs(useProductsStore());
const { searchProducts } = useProductsStore();

function handleRedirect(){
  if (useRoute().query.categoryId){
    filters.value.categoryId = useRoute().query.categoryId
  }
}

onMounted(() => {
  getCategories();
  handleRedirect()
  searchProducts()
});

const categories = ref<{ id: number; name: string }[]>([]);

async function getCategories(): Promise<void> {
  try {
    const data = await $apiClient<{ id: number; name: string }[]>("/products/categories");
    categories.value = [ { id: 0, name: "All" }, ...data];
  } catch (error) {
    console.error(error);
  }
}

watch(() => filters.value.categoryId, () => {
  productsPaginationInfo.value!.currentPage = 1
  searchProducts()
}, {deep: true})

const handleDebounceSearch = useDebounceFn(() => {
  productsPaginationInfo.value!.currentPage = 1
  searchProducts()
}, 500)

</script>

<template>
  <div class="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
    <h1 class="text-3xl font-bold">Products</h1>
    <div class="w-full md:w-1/2 flex flex-col md:flex-row items-center gap-4">
      <Select v-model="filters.categoryId">
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem
              v-for="category in categories"
              :key="category.id"
              :value="String(category.id)"
            >
              {{category.name}}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div class="relative w-full md:max-w-sm items-center">
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
    :total="productsPaginationInfo?.totalProducts"
    :items-per-page="productsPaginationInfo?.limit"
    :sibling-count="1"
    show-edges
    :default-page="1">
    <PaginationList
      v-slot="{ items }"
      class="flex items-center justify-center gap-1">
      <PaginationFirst @click="handlePagination('first', searchProducts, productsPaginationInfo)" />
      <PaginationPrev @click="handlePagination('prev', searchProducts, productsPaginationInfo)" />

      <template v-for="(item, index) in items">
        <PaginationListItem
          v-if="item.type === 'page'"
          :key="index"
          :value="item.value"
          as-child>
          <Button
            @click="handlePagination( 'specific', searchProducts, productsPaginationInfo, item.value)"
            class="w-10 h-10 p-0"
            :variant="item.value === page ? 'default' : 'outline'">
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext @click="handlePagination('next', searchProducts, productsPaginationInfo)" />
      <PaginationLast @click="handlePagination('last', searchProducts, productsPaginationInfo)" />
    </PaginationList>
  </Pagination>
</template>
