<script setup lang="ts">
import type { INews } from "~/types/INews";

defineProps<{
  newsList: INews[];
}>();
</script>

<template>
  <div class="flex flex-col gap-20 lg:grid md:grid-cols-2">
    <NewsCard
      v-for="news in newsList"
      :key="news.id"
      :news="news" />
  </div>
</template>