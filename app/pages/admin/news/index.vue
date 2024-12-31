<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "~/components/ui/button";
import NewsItem from "@/components/admin/news/NewsItem.vue";
import { Input } from "~/components/ui/input";
import Calendar from "~/components/common/Calendar.vue";

definePageMeta({
  layout: "admin",
});

const { searchNewsItems, searchNewsPagination, newsFilters, authors } = storeToRefs(useNewsStore());
const { getAuthors, searchNews } = useNewsStore();

onMounted(() => {
  searchNews();
  getAuthors();
});
</script>

<template>
  <NuxtLink class="my-4" to="/admin/news/create">
    <Button class="w-full">Create</Button>
  </NuxtLink>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:flex items-end gap-4 my-4">
    <div class="flex flex-col gap-2">
      <span class="text-sm">Total</span>
      <Input v-model="searchNewsPagination.total" readonly />
    </div>
    <div class="flex flex-col gap-2 flex-1">
      <span class="text-sm">Title</span>
      <Input v-model="newsFilters.title" placeholder="Title" />
    </div>
    <div class="flex flex-col gap-2 flex-1">
      <span class="text-sm">Author</span>
      <Select v-model="newsFilters.authorId">
        <SelectTrigger>
          <SelectValue placeholder="Select an author" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="0"> All </SelectItem>
            <SelectItem
              v-for="author in authors"
              :key="author.id"
              :value="author.id">
              {{ author.firstName }} {{ author.lastName }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <div class="flex flex-col gap-2 flex-1">
      <span class="text-sm">Date</span>
      <Calendar v-model="newsFilters.date" />
    </div>
    <Button @click="searchNews"> Search </Button>
  </div>
  <div v-auto-animate v-if="searchNewsItems.length" class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <NewsItem v-for="news in searchNewsItems" :key="news.id" :news="news" />
  </div>
  <p v-else class="text-5xl font-bold text-center pt-10">No news found</p>
</template>
