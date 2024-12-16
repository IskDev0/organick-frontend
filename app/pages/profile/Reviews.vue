<script setup lang="ts">
definePageMeta({
  layout: "profile",
  middleware: "access",
});

const { getUserReviews } = useReviewsStore();
const { userReviews } = storeToRefs(useReviewsStore());
onMounted(async () => {
  await getUserReviews();
});
</script>

<template>
  <h1 class="text-3xl font-bold mb-10">My Reviews</h1>
  <ProfileReviewsList
    v-if="userReviews && userReviews.length > 0"
    :reviews="userReviews" />
  <p v-else class="text-3xl font-bold text-center">No reviews yet</p>
</template>
