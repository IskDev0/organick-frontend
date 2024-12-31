import type { IAuthor, INews, INewsList } from "~/types/INews";

export const useNewsStore = defineStore("news", () => {
  const { $apiClient } = useNuxtApp();

  const news = ref<INews[]>([]);
  const authors = ref<IAuthor[]>([])

  const newsPaginationInfo = ref();
  const newsFilters = ref({
    title: "",
    authorId: "",
    date: ""
  })
  const searchNewsItems = ref<INews[]>([])
  const searchNewsPagination = ref({
    currentPage:1,
    totalPages:1,
    total:1,
    limit:10
  })

  const getNews = async (page = 1): Promise<void> => {
    try {
      const { data, pagination } = await $apiClient<INewsList>(
        `/news?page=${page}`,
      );
      news.value = data;
      newsPaginationInfo.value = pagination;
    } catch (error) {
      console.error(error);
    }
  };

  const getNewsById = async (id: string): Promise<INews> => {
    try {
      return await $apiClient<INews>(`/news/${id}`);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch news");
    }
  };

  const getNewsByAuthorId = async (id: string): Promise<INews[]> => {
    try {
      return await $apiClient<INews[]>(`/news/author/${id}`);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch news");
    }
  };

  const getAuthors = async ():Promise<void> => {
    try {
      authors.value = await $apiClient<IAuthor[]>('/news/authors');
    } catch (error) {
      console.error(error);
    }
  }

  const searchNews = async ():Promise<void> => {

    let params = new URLSearchParams();
    Object.entries(newsFilters.value).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    })
    try {
      const { data, pagination } = await $apiClient<INewsList>(
        `/news/search?page=${searchNewsPagination.value?.currentPage}&limit=${searchNewsPagination.value?.limit}&${params.toString()}`,
      );
      searchNewsItems.value = data;
      searchNewsPagination.value = pagination;
    } catch (error) {
      console.error(error);
    }

  }

  const updateNews = async (id, updateData):Promise<void> => {
    try {
      await $apiClient(`/news/${id}`, {
        method: "PUT",
        body: updateData
      });
    } catch (error) {
      console.error(error);
    }
  }

  const deleteNews = async (id: string):Promise<void> => {
    try {
      await $apiClient(`/news/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
  }

  return {
    news,
    authors,
    newsPaginationInfo,
    newsFilters,
    searchNewsItems,
    searchNews,
    updateNews,
    searchNewsPagination,
    getNews,
    getNewsById,
    getNewsByAuthorId,
    getAuthors,
    deleteNews
  };
});
