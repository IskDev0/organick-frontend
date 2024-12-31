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
import { Trash2 } from "lucide-vue-next";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/toast";

const props = defineProps<{
  id: string,
  open: boolean
}>()

const emit = defineEmits<{
  (e: "update:open", payload: boolean): void;
}>();

const {toast} = useToast()

const {searchNews, deleteNews} = useNewsStore()

async function handleNewsDelete(){
  try {
    await deleteNews(props.id)
    emit('update:open', false)
    toast({
      title: "Success",
      description: "News deleted successfully"
    })
    await searchNews()
  }catch (error){
    toast({
      title: "Error",
      description: error.data,
      variant: "destructive"
    })
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
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete News</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this news?
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <DialogClose as-child>
          <Button variant="outline"> Cancel </Button>
        </DialogClose>
        <Button @click="handleNewsDelete" type="submit"> Delete</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>