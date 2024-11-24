<template>
  <div class="flex items-center space-x-1">
    <button
      v-for="star in maxStars"
      :key="star"
      type="button"
      @click="setRating(star)"
      @mouseover="hoverRating = star"
      @mouseleave="hoverRating = 0"
      class="text-gray-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        :class="{
          'text-yellow-400': star <= (hoverRating || rating),
        }"
        class="w-6 h-6">
        <path
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
const { modelValue } = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  maxStars: {
    type: Number,
    default: 5,
  },
});

const emit = defineEmits<{
  (e: "update:modelValue", value: number): void;
}>();

const rating = ref(modelValue);
const hoverRating = ref(0);

const setRating = (value: number): void => {
  rating.value = value;
  emit("update:modelValue", rating.value);
};

watch(
  () => modelValue,
  (newVal) => {
    rating.value = newVal;
  },
);
</script>
