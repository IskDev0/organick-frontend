<script setup lang="ts">
import Offers from "~/components/landing/Offers.vue";
import AboutSection from "~/components/landing/AboutSection.vue";
import ProductsSection from "~/components/landing/ProductsSection.vue";
import TestimonialsSection from "~/components/landing/TestimonialsSection.vue";
import NewsSection from "~/components/landing/NewsSection.vue";

definePageMeta({
  layout: "wide",
});
</script>

<template>
  <div class="flex flex-col gap-[150px]">
    <LandingHero />
    <Offers />
    <AboutSection/>
    <ProductsSection/>
    <TestimonialsSection/>
    <NewsSection/>
  </div>
</template>