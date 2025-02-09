<script setup lang="ts">
import { useNewsStore } from "~/stores/news";
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "~/components/ui/pagination";
import { Button } from "~/components/ui/button";

const { getNews } = useNewsStore();
const { news, paginationInfo } = storeToRefs(useNewsStore());

onMounted(() => getNews());

async function goNext(): Promise<void> {
  paginationInfo.value!.currentPage++;
  await getNews(paginationInfo.value!.currentPage);
}

async function goPrev(): Promise<void> {
  paginationInfo.value!.currentPage--;
  await getNews(paginationInfo.value!.currentPage);
}

async function goFirst(): Promise<void> {
  paginationInfo.value!.currentPage = 1;
  await getNews(paginationInfo.value!.currentPage);
}

async function goLast(): Promise<void> {
  paginationInfo.value!.currentPage = paginationInfo.value!.totalPages;
  await getNews(paginationInfo.value!.currentPage);
}

async function goPage(page: number): Promise<void> {
  paginationInfo.value!.currentPage = page;
  await getNews(paginationInfo.value!.currentPage);
}
</script>

<template>
  <section v-if="news.length > 0">
    <NewsList :news-list="news" />
    <Pagination
      class="mt-20"
      v-if="news.length > 0"
      v-slot="{ page }"
      :total="paginationInfo?.totalNews"
      :items-per-page="paginationInfo?.limit"
      :sibling-count="1"
      show-edges
      :default-page="1">
      <PaginationList
        v-slot="{ items }"
        class="flex items-center justify-center gap-1">
        <PaginationFirst @click="goFirst" />
        <PaginationPrev @click="goPrev" />

        <template v-for="(item, index) in items">
          <PaginationListItem
            v-if="item.type === 'page'"
            :key="index"
            :value="item.value"
            as-child>
            <Button
              @click="goPage(item.value)"
              class="w-10 h-10 p-0"
              :variant="item.value === page ? 'default' : 'outline'">
              {{ item.value }}
            </Button>
          </PaginationListItem>
          <PaginationEllipsis v-else :key="item.type" :index="index" />
        </template>

        <PaginationNext @click="goNext" />
        <PaginationLast @click="goLast" />
      </PaginationList>
    </Pagination>
  </section>
  <p v-else class="font-bold text-4xl text-center">No news found</p>
</template>
