<script setup lang="ts">
import Offers from "~/components/landing/Offers.vue";

definePageMeta({
  layout: "wide",
});
</script>

<template>
  <div class="flex flex-col gap-[150px]">
    <LandingHero />
    <Offers />
  </div>
</template>