<script setup lang="ts">
import { Button } from "~/components/ui/button";
import type { INews, INewsList } from "~/types/INews";

const { $apiClient } = useNuxtApp();

const news = ref<INews[]>([]);

async function getNews(): Promise<void> {
  try {
    const response = await $apiClient<INewsList>("/news?limit=4", {
      method: "GET",
    });
    news.value = response.data;
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => getNews());
</script>

<template>
  <section class="container mb-10">
    <div class="flex flex-col gap-2 mb-10">
      <h3 class="text-3xl font-yellowtail text-[#7EB693]">News</h3>
      <div
        class="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <p class="font-extrabold text-5xl">
          Discover weekly content about <br />
          organic food, & more
        </p>
        <NuxtLink to="/news">
          <Button size="lg">More News</Button>
        </NuxtLink>
      </div>
    </div>
    <NewsList v-if="news.length > 0" :newsList="news" />
    <p class="text-2xl font-bold text-center pt-10">No news found</p>
  </section>
</template>