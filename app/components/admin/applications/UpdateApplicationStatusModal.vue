<script setup lang="ts">
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "~/components/ui/button";
import { Pencil } from "lucide-vue-next";
import { useApplicationsStore } from "~/stores/admin/applications";
import { useToast } from "~/components/ui/toast";

const { toast } = useToast();

const props = defineProps<{
  id: string;
  open: boolean;
}>();

const emit = defineEmits<{
  (e: "update:open", payload: boolean): void;
  (e: "updated"): void;
}>();

const statuses = [
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "accepted",
    label: "Accepted",
  },
  {
    value: "rejected",
    label: "Rejected",
  },
];

const applicationStatus = ref<string>("");
const { getApplications, updateApplicationStatus } = useApplicationsStore();

async function handleStatusUpdate() {
  try {
    await updateApplicationStatus(props.id, applicationStatus.value);
    await getApplications();
    toast({ title: "Application status updated successfully" });
    emit("update:open", false);
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
        <Pencil :size="20" />
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Set application status</DialogTitle>
      </DialogHeader>
      <Select v-model="applicationStatus">
        <SelectTrigger>
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem
              v-for="status in statuses"
              :key="status.value"
              :value="status.value">
              {{ status.label }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <DialogFooter>
        <DialogClose>
          <Button variant="outline">Cancel</Button>
        </DialogClose>
        <Button @click="handleStatusUpdate" type="submit">Update</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
