import type {
  IProfileReview,
  IProfileReviewList,
  IReview,
  IReviewList,
} from "~/types/IReview";

export const useReviewsStore = defineStore("reviews", () => {
  const { $apiClient } = useNuxtApp();

  const reviews = ref<IReview[]>([]);
  const reviewsPaginationInfo = ref();
  const userReviews = ref<IProfileReview[]>();
  const userReviewsPaginationInfo = ref({});

  const getReviews = async (id: string): Promise<void> => {
    try {
      const { data, pagination } = await $apiClient<IReviewList>(
        `/reviews/${id}`,
      );
      reviews.value = data;
      reviewsPaginationInfo.value = pagination;
    } catch (error) {
      console.error(error);
    }
  };

  const postReview = async (postForm: {
    rating: number;
    comment: string;
    productId: string;
  }): Promise<void> => {
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

  const getUserReviews = async (): Promise<void> => {
    try {
      const { data, pagination } =
        await $apiClient<IProfileReviewList>("/reviews");
      if (data) {
        userReviews.value = data;
        userReviewsPaginationInfo.value = pagination;
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    reviews,
    reviewsPaginationInfo,
    userReviews,
    getReviews,
    postReview,
    deleteReview,
    getUserReviews,
  };
});
