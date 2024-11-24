import type { IReview, IReviewList } from "~/types/IReview";

export const useReviewsStore = defineStore("reviews", () => {
  const { $apiClient } = useNuxtApp();

  const reviews = ref<IReview[]>([]);
  const reviewsPaginationInfo = ref();

  const getReviews = async (id: number): Promise<void> => {
    try {
      const { data, pagination } = await $apiClient<IReviewList>(`/reviews/${id}`);
      reviews.value = data;
      reviewsPaginationInfo.value = pagination;
    } catch (error) {
      console.error(error);
    }
  };

  const postReview = async (postForm: {rating: number, comment: string, product_id: number}): Promise<void> => {
    try {
      await $apiClient("/reviews", {
        method: "POST",
        credentials: "include",
        body: postForm,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteReview = async (id: number): Promise<void> => {
    try {
      await $apiClient(`/reviews/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getUserReviews = async ():Promise<IReview[]> => {
    try {
      return await $apiClient<IReview[]>("/reviews");
    } catch (error) {
      console.error(error);
      return []
    }
  }

  return {
    reviews,
    reviewsPaginationInfo,
    getReviews,
    postReview,
    deleteReview,
    getUserReviews
  };
});
