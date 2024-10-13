<script setup lang="ts">
import { Button } from "@/components/ui/button";
</script>

<template>
  <div class="landing-hero mt-40 h-[400px] md:h-[800px]">
    <div class="container h-full flex flex-col justify-center bg-white bg-opacity-30 md:bg-transparent">
      <div class="flex flex-col items-center text-center md:items-start md:text-left">
        <h2 class="font-yellowtail text-[#68A47F] text-2xl md:text-4xl">100% Natural Food</h2>
        <h3 class="text-4xl md:text-7xl text-primary font-extrabold pt-2 pb-8">
          Choose the best <br />
          healthier way <br />
          of life
        </h3>
        <NuxtLink to="/products">
          <Button size="lg" variant="accent">Explore Now</Button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style>
.landing-hero {
  background: url("/images/landing/hero.png") no-repeat center/cover;
}
</style>