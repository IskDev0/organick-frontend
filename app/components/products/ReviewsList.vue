<script setup lang="ts">

import ReviewItem from "~/components/products/ReviewItem.vue";
import type { IReview } from "~/types/IReview";

defineProps<{
  reviews: IReview[]
}>()
</script>

<template>
<div class="flex flex-col gap-4">
  <ReviewItem v-for="review in reviews" :key="review.id" :review="review"/>
</div>
</template>