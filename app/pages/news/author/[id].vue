<script setup lang="ts">
import type { INews } from "~/types/INews";
import type { UserInfo } from "~/types/UserInfo";

const { $apiClient } = useNuxtApp();

const { getNewsByAuthorId } = useNewsStore();

const id = parseInt(useRoute().params.id as string);

const authorNews = ref<INews[]>([]);
const authorInfo = ref<UserInfo>({});

async function getNewsAuthor(id: number): Promise<void> {
  try {
    authorInfo.value = await $apiClient<UserInfo>(`/users/${id}`);
  } catch (error) {
    console.error(error);
  }
}

onMounted(async () => {
  authorNews.value = await getNewsByAuthorId(id);
  await getNewsAuthor(id);
});
</script>

<template>
  <div class="bg-white dark:bg-zinc-900 p-8 rounded-2xl mb-4" v-if="authorInfo">
    <div class="flex items-top gap-10">
      <NuxtImg
        class="rounded-full w-24 h-24"
        src="https:picsum.photos/1000/1000" />
      <div class="flex flex-col">
        <h1 class="text-2xl font-bold">
          {{ authorInfo.first_name }} {{ authorInfo.last_name }}
        </h1>
        <p class="text-sm text-zinc-600 dark:text-zinc-400">
          Email: {{ authorInfo.email }}
        </p>
      </div>
    </div>
  </div>
  <NewsList v-if="authorNews?.length > 0" :news-list="authorNews" />
  <p v-else class="text-5xl font-bold text-center pt-10">No news found</p>
</template>
