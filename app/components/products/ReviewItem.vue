<script setup lang="ts">
import type { IReview } from "~/types/IReview";
import getDateFull from "../../utils/date/getDateFull";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/toast";

defineProps<{
  review: IReview;
}>();

const { toast } = useToast();

const { getReviews, deleteReview } = useReviewsStore();

async function deleteReviewItem(id: number) {
  await deleteReview(id);
  await getReviews(useRoute().params.id);
  toast({
    title: "Review deleted",
    description: "Review deleted successfully",
  });
}
</script>

<template>
  <article class="bg-gray-100 px-4 pt-6 pb-4 rounded-xl dark:bg-zinc-900">
    <div class="flex flex-col md:flex-row justify-between">
      <p class="font-bold text-xl">
        {{ review.first_name }} {{ review.last_name }}
      </p>
      <div class="flex items-center">
        <Icon
          size="20"
          v-for="i in 5"
          :key="i"
          :class="i <= review.rating ? 'text-[#FFA858]' : 'text-gray-400'"
          name="mynaui:star-solid" />
      </div>
    </div>
    <p class="mt-2">{{ review.comment }}</p>
    <div class="flex items-center justify-between mt-2">
      <p class="text-[#7EB693] text-md md:text-xl font-yellowtail">
        {{ getDateFull(review.created_at) }}
      </p>
      <Button
        @click="deleteReviewItem(review.id)"
        v-if="useAuthStore().userInfo?.id === review.user_id"
        variant="ghost">
        <Icon size="20" name="mingcute:delete-2-line" />
      </Button>
    </div>
  </article>
</template>