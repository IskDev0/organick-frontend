<script setup lang="ts">
import { useNewsStore } from "~/stores/news";

const { getNews } = useNewsStore();
const { news } = storeToRefs(useNewsStore());

onMounted(() => getNews());
</script>

<template>
  <NewsList :news-list="news" />
</template>