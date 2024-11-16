<script setup lang="ts">
import type { INews } from "~/types/INews";
import getDateFull from "~/utils/date/getDateFull";

definePageMeta({
  layout: "wide",
})

const { getNewsById } = useNewsStore();

const id = parseInt(useRoute().params.id as string);

const newsInfo = ref<INews>();

onMounted(async () => {
  newsInfo.value = await getNewsById(id);
});
</script>

<template>
  <section class="mt-40" v-if="newsInfo">
    <div class="w-full h-[300px] md:h-[600px]">
      <NuxtImg class="w-full h-full object-cover" src="https://picsum.photos/1000/1000"/>
    </div>
    <div class="container relative -top-32">
      <div class="flex flex-col-reverse gap-2 md:flex-col shadow-lg bg-white dark:bg-zinc-800 p-5 md:p-20 rounded-2xl">
        <div class="flex flex-col items-start md:flex-row md:items-center gap-4">
          <p>
            <span class="font-bold">Posted on:</span> {{getDateFull(newsInfo.created_at)}}
          </p>
          <div class="flex items-center gap-2">
            <Icon class="bg-[#7EB693]" name="heroicons:user-16-solid" />
            <span>
              <NuxtLink :to="`/news/author/${newsInfo.user_id}`">
                By {{newsInfo.first_name}} {{newsInfo.last_name}}
              </NuxtLink>
            </span>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <h1 class="text-4xl md:text-7xl font-extrabold py-4">{{newsInfo.title}}</h1>
          <p class=" text-[#525C60] dark:text-gray-300">{{newsInfo.short_description}}</p>
        </div>
      </div>
      <div v-html="newsInfo.content" class="htmlResult mt-20 prose dark:prose-invert"/>
    </div>
  </section>
</template>

<style>
.htmlResult h1, h2, h3, h4, h5, h6 {
  @apply my-4
}

.htmlResult h1 {
  @apply text-5xl;
}

.htmlResult h2 {
  @apply text-4xl;
}

.htmlResult h3 {
  @apply text-3xl;
}

.htmlResult h4 {
  @apply text-2xl;
}

.htmlResult h5 {
  @apply text-xl;
}

.htmlResult h6 {
  @apply text-lg;
}

.htmlResult a {
  @apply text-blue-400 underline-offset-4 hover:underline;
}
.htmlResult blockquote {
  @apply flex items-center justify-center bg-[#F1EDEA] p-10 rounded-xl font-bold my-4;
}

.dark .htmlResult blockquote {
  @apply bg-zinc-800
}

.htmlResult hr {
  @apply my-4;
}

.htmlResult ul {
  @apply pl-4 list-disc;
}

.htmlResult ol {
  @apply pl-4 list-decimal;
}

.htmlResult code {
  @apply text-[#d6336c]
}

.htmlResult pre code {
  @apply bg-none text-inherit p-0 text-sm
}

.htmlResult pre {
  @apply bg-gray-800 text-gray-100 p-4 rounded-lg overflow-x-auto font-['JetBrainsMono'] w-full my-4
}
</style>