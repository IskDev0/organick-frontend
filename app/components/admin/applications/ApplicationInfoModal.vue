<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import type { IApplication } from "~/types/admin/IApplication";
import {Eye} from "lucide-vue-next";
import { Button } from "~/components/ui/button";
import getDateFull from "../../../utils/date/getDateFull";

defineProps<{
  application: IApplication
}>()
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <Button variant="ghost">
        <Eye/>
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{application.subject}}</DialogTitle>
      </DialogHeader>
        <p>{{application.message}}</p>
        <div class="flex items-end justify-between">
          <div class="flex flex-col gap-2">
            <span>{{application.fullName}} ({{application.company}})</span>
            <a :href="`mailto:${application.email}`">{{application.email}}</a>
          </div>
          <span>{{getDateFull(application.createdAt)}}</span>
        </div>
    </DialogContent>
  </Dialog>
</template>