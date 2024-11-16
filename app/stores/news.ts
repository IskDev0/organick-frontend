import type { INews, INewsList } from "~/types/INews";

export const useNewsStore = defineStore("news", () => {
  const { $apiClient } = useNuxtApp();

  const news = ref<INews[]>([]);

  const filters = ref({});
  const paginationInfo = ref();

  const getNews = async () => {
    try {
      const { data, pagination } = await $apiClient<INewsList>("/news");
      news.value = data;
      paginationInfo.value = pagination;
    } catch (error) {
      console.error(error);
    }
  };

  const getNewsById = async (id: number): Promise<INews> => {
    try {
      return await $apiClient<INews>(`/news/${id}`);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch news");
    }
  };

  const getNewsByAuthorId = async (id: number): Promise<INews[]> => {
    try {
      return await $apiClient<INews[]>(`/news/author/${id}`);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch news");
    }
  };

  return {
    news,
    filters,
    getNews,
    getNewsById,
    getNewsByAuthorId,
  };
});
