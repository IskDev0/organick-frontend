<script setup lang="ts">
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
import { Button } from "~/components/ui/button";
import { Trash2 } from "lucide-vue-next";
import { useToast } from "~/components/ui/toast";
import { useApplicationsStore } from "~/stores/admin/applications";

const { toast } = useToast();

const props = defineProps<{
  id: string;
  open: boolean;
}>();

const emit = defineEmits<{
  (e: "update:open", payload: boolean): void;
  (e: "deleted"): void;
}>();

const { getApplications, deleteApplication } = useApplicationsStore();

async function handleApplicationDelete() {
  try {
    await deleteApplication(props.id);
    await getApplications();
    toast({ title: "Application deleted successfully" });
    emit("deleted");
  } catch (error) {
    console.error(error);
    toast({
      title: "Error",
      description: error.data.message,
      variant: "destructive",
    });
  }
}
</script>

<template>
  <Dialog :open="props.open" @update:open="emit('update:open', $event)">
    <DialogTrigger>
      <Button variant="ghost">
        <Trash2 :size="20" />
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete Application</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this application?
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <DialogClose as-child>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button @click="handleApplicationDelete" type="submit">Delete</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>