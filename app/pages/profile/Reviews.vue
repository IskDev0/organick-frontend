<script setup lang="ts">
import type { IReview } from "~/types/IReview";
import ReviewsList from "~/components/products/ReviewsList.vue";

definePageMeta({
  layout: "profile",
  middleware: "access",
});

const userReviews = ref<IReview[]>([]);

const { getUserReviews } = useReviewsStore();
onMounted(async () => {
  userReviews.value = await getUserReviews();
});
</script>

<template>
  <h1 class="text-3xl font-bold mb-10">My Reviews</h1>
  <ReviewsList :reviews="userReviews" />
</template>
