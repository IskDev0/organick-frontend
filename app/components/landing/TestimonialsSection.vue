<script setup lang="ts">
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css/pagination";
import "swiper/css";

const { $apiClient } = useNuxtApp();

const modules = [Pagination, Autoplay];

const swiperConfig = {
  pagination: {
    dynamicBullets: true,
    clickable: true,
  },
  autoplay: {
    delay: 5000,
  },
  loop: true,
};

const testimonials = ref<ITestimonial[]>([]);

interface ITestimonial {
  id: number;
  image: string;
  rating: number;
  fullName: string;
  content: string;
  position: string;
}

async function getTestimonials(): Promise<void> {
  const response = await $apiClient<ITestimonial[]>(`/testimonials`);
  if (response.length > 0) {
    testimonials.value = response;
  }
}

onMounted(() => getTestimonials());
</script>

<template>
  <section class="bg-[#F9F8F8] dark:bg-zinc-900">
    <div class="container py-20 h-full">
      <div class="flex flex-col items-center text-center gap-2 mb-10">
        <h3 class="text-3xl font-yellowtail text-[#7EB693]">Testimonial</h3>
        <p class="font-extrabold text-5xl">What Our Customer Saying?</p>
      </div>
      <Swiper
        :modules="modules"
        :space-between="50"
        :slides-per-view="1"
        :centered-slides="true"
        :pagination="swiperConfig.pagination"
        :autoplay="swiperConfig.autoplay"
        :loop="swiperConfig.loop">
        <SwiperSlide v-for="testimonial in testimonials">
          <div class="flex items-center justify-center h-full">
            <div class="flex flex-col items-center justify-center py-8">
              <div class="flex flex-col items-center gap-2">
                <NuxtImg
                  :src="testimonial.image"
                  class="rounded-full h-20 w-20" />
                <div class="flex">
                  <Icon
                    size="20"
                    v-for="i in testimonial.rating"
                    :key="i"
                    class="text-[#FFA858]"
                    name="mynaui:star-solid" />
                </div>
              </div>
              <div
                class="flex flex-col items-center text-center gap-2 max-w-none md:max-w-[calc(100%-100px)]">
                <p class="my-6 text-[#525C60] dark:text-white">
                  {{ testimonial.content }}
                </p>
                <span class="text-2xl font-semibold">{{testimonial.fullName}}</span>
                <span>{{ testimonial.position }}</span>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </section>
</template>

<style>
.swiper-pagination-bullet-active {
  background-color: #7eb693 !important;
}
</style>
