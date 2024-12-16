<script setup lang="ts">
import type { IProfileReview } from "~/types/IReview";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/toast";
import getDateFull from "../../../utils/date/getDateFull";

defineProps<{
  review: IProfileReview;
}>();

const { toast } = useToast();

const { getUserReviews, deleteReview } = useReviewsStore();

async function deleteReviewItem(id: number): Promise<void> {
  await deleteReview(id);
  await getUserReviews();
  toast({
    title: "Success",
    description: "Review deleted successfully",
  });
}
</script>

<template>
  <article class="bg-gray-100 dark:bg-zinc-900 p-5 rounded-2xl">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <NuxtImg
          class="w-20 h-20"
          :src="review.product_image"
          :alt="review.product_name" />
        <div class="flex flex-col gap-2">
          <NuxtLink class="font-bold text-lg" :to="`/products/${review.product_id}`">
            <p>{{ review.product_name }}</p>
          </NuxtLink>
          <div class="flex items-center">
            <Icon
              size="20"
              v-for="i in 5"
              :key="i"
              :class="i <= review.rating ? 'text-[#FFA858]' : 'text-gray-400'"
              name="mynaui:star-solid" />
          </div>
        </div>
      </div>
      <Button
        @click="deleteReviewItem(review.id)"
        v-if="useAuthStore().userInfo?.id === review.user_id"
        variant="ghost">
        <Icon size="20" name="mingcute:delete-2-line" />
      </Button>
    </div>
    <p>{{ review.comment }}</p>
    <div class="flex items-center justify-between mt-4">
      <p class="text-[#7EB693] text-md md:text-xl font-yellowtail">
        {{ getDateFull(review.created_at) }}
      </p>
    </div>
  </article>
</template>
