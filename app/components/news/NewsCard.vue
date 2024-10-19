<script setup lang="ts">
import type { INews } from "~/types/INews";
import getShortDate from "~/utils/date/getShortDate";
import { Button } from "~/components/ui/button";

defineProps<{
  news: INews;
}>();
</script>

<template>
  <article
    class="h-[300px] bg-cover bg-center rounded-2xl relative"
    :style="{ backgroundImage: `url(${news.preview})` }">
    <div
      class="inline-flex items-center justify-center bg-white rounded-full ml-4 mt-4 dark:bg-zinc-900">
      <span
        class="w-16 h-16 aspect-square flex items-center justify-center font-bold"
        >{{ getShortDate(news.created_at) }}</span>
    </div>
    <div class="absolute -bottom-4 left-0 right-0 md:-bottom-10 md:left-6 md:right-6 bg-white rounded-2xl shadow-lg p-6 dark:bg-zinc-900">
      <NuxtLink :to="`/news/author/${news.user_id}`">
        <div class="flex gap-2">
          <Icon class="bg-[#7EB693]" name="heroicons:user-16-solid" />
          <span>{{ `${news.first_name} ${news.last_name}` }}</span>
        </div>
      </NuxtLink>
      <div class="flex flex-col py-4">
        <h3 class="text-2xl font-bold">{{ news.title }}</h3>
        <p class="truncate md:overflow-visible md:whitespace-normal">{{ news.short_description }}</p>
      </div>
      <NuxtLink :to="`/news/${news.id}`">
        <Button size="xs" variant="link">Read More</Button>
      </NuxtLink>
    </div>
  </article>
</template>
