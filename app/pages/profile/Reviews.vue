<script setup lang="ts">
definePageMeta({
  layout: "profile",
});

const { getUserReviews } = useReviewsStore();
const { userReviews } = storeToRefs(useReviewsStore());
onMounted(async () => {
  await getUserReviews();
});
</script>

<template>
  <ProfileReviewsList
    v-if="userReviews && userReviews.length > 0"
    :reviews="userReviews" />
  <div v-else class="flex flex-col items-center justify-center h-full">
    <p class="text-3xl font-bold text-center mt-10">No reviews yet</p>
  </div>
</template>
