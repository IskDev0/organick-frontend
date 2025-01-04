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
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "~/components/ui/toast";
import { useUsersStore } from "~/stores/admin/users";
import { Trash2 } from "lucide-vue-next";

const { id, open } = defineProps<{
  id: string;
  open: boolean;
}>();

const emit = defineEmits<{
  (e: "update:open", payload: boolean): void;
}>();

const { getUsers, deleteUser } = useUsersStore();

const { toast } = useToast();

async function handleUserDelete(): Promise<void> {
  try {
    await deleteUser(id);
    toast({
      title: "Success",
      description: "User deleted successfully",
    });
    emit("update:open", false);
    await getUsers();
  } catch (error) {
    toast({
      title: "Error",
      description: error.data.message,
      variant: "destructive",
    });
  }
}
</script>

<template>
  <Dialog :open="open" @update:open="emit('update:open', $event)">
    <DialogTrigger>
      <Button variant="ghost">
        <Trash2 :size="20" />
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Delete user</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this user?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose as-child>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button @click="handleUserDelete" type="submit"> Delete</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
