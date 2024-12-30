<script setup lang="ts">
definePageMeta({
  layout: "admin",
});

const { getProducts } = useProductsStore();
const { products } = storeToRefs(useProductsStore());
import { columns } from "@/components/admin/products/data-table/columns";
import DataTable from "@/components/admin/products/data-table/DataTable.vue";
import { Plus } from "lucide-vue-next";
import { Button } from "~/components/ui/button";

onMounted(async () => {
  await getProducts();
});
</script>

<template>
  <NuxtLink to="/admin/products/add">
    <Button>
      <Plus class="mr-2 h-4 w-4" />
      Add
    </Button>
  </NuxtLink>
  <DataTable :columns="columns" :data="products" />
</template>