<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "~/components/ui/toast";

defineProps<{
  id: string;
  open: boolean;
}>();

const emit = defineEmits<{
  (e: "update:open", payload: boolean): void;
}>();

const { deleteProduct, getProducts } = useProductsStore();

const { toast } = useToast();

const handleProductDelete = async (id: string): Promise<void> => {
  if (id) {
    try {
      await deleteProduct(id);
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
      emit("update:open", false);
      await getProducts();
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
      });
    }
  }
};
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Delete product</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this product?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose as-child>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button @click="handleProductDelete(id)" type="submit"> Delete </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>