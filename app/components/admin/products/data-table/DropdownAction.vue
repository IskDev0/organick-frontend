<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-vue-next";
import type { IProduct } from "~/types/IProduct";
import DeleteProductModal from "~/components/admin/products/data-table/DeleteProductModal.vue";

defineProps<{
  product: IProduct;
}>();

const isEditModalOpen = ref<boolean>(false);
const isDeleteModalOpen = ref<boolean>(false);
const selectedProductId = ref<string>("");

function openModal(id: string, type: "edit" | "delete"): void {
  if (type === "edit") {
    isEditModalOpen.value = true;
  } else if (type === "delete") {
    isDeleteModalOpen.value = true;
  }

  selectedProductId.value = id;
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>
      <Button variant="ghost">
        <EllipsisVertical />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem
        @click="navigateTo(`/admin/products/edit/${product.id}`)">
        <div class="flex items-center gap-2">
          <Pencil :size="16" class="mr-2" />
          <span>Edit</span>
        </div>
      </DropdownMenuItem>
      <DropdownMenuItem @click="openModal(product.id, 'delete')">
        <div class="flex items-center gap-2">
          <Trash2 :size="16" class="mr-2" />
          <span>Delete</span>
        </div>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>

  <DeleteProductModal
    :id="selectedProductId"
    v-model:open="isDeleteModalOpen" />
</template>
