<script setup lang="ts">
import type { IProfileReview } from "~/types/IReview";

defineProps<{
  reviews: IProfileReview[];
}>();
</script>

<template>
  <div v-auto-animate class="flex flex-col gap-4">
    <ProfileReviewsItem
      v-for="review in reviews"
      :key="review.id"
      :review="review" />
  </div>
</template>