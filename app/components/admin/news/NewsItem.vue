<script setup lang="ts">
import type { INews } from "~/types/INews";
import getDateFull from "../../../utils/date/getDateFull";
import { Button } from "~/components/ui/button";
import {Pencil} from "lucide-vue-next";
import DeleteNewsModal from "~/components/admin/news/DeleteNewsModal.vue";

defineProps<{
  news: INews
}>()

const isNewsDeleteModalOpen = ref<boolean>(false)
</script>

<template>
<article class="bg-white dark:bg-background p-6 rounded-2xl">
  <div class="flex justify-between">
    <span class="font-yellowtail text-xl text-[#7EB693]">{{news.user.firstName}} {{news.user.lastName}}</span>
    <div class="flex gap-2">
      <NuxtLink :to="`/admin/news/${news.id}/edit`">
        <Button variant="ghost">
          <Pencil :size="20"/>
        </Button>
      </NuxtLink>
      <DeleteNewsModal
      v-model:open="isNewsDeleteModalOpen"
      :id="news.id"
      />
    </div>
  </div>
  <p class="font-bold text-2xl">{{news.title}}</p>
  <p>{{news.shortDescription}}</p>
  <p class="text-sm text-zinc-600 dark:text-zinc-400">{{getDateFull(news.createdAt)}}</p>

</article>
</template>