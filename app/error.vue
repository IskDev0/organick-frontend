<script setup lang="ts">
import TheFooter from "~/components/common/TheFooter.vue";
import TheHeader from "~/components/common/TheHeader.vue";
import NewsletterSubscribe from "~/components/common/NewsletterSubscribe.vue";
import { Button } from "~/components/ui/button";
</script>

<template>
  <TheHeader />
  <main class="mt-40">
    <div class="error-container h-[400px] md:h-[800px]">
      <div class="container flex items-center justify-between h-full">
        <div class="w-0 md:w-1/2">
        </div>
        <div class="w-full  md:w-1/2 flex flex-col items-center text-center md:text-left md:items-start justify-center h-full">
          <NuxtImg src="/images/404-image.svg"/>
          <p class="text-5xl md:text-[70px] font-black mt-4 dark:text-[#264b59]">Page not found</p>
          <p class="py-4 dark:text-[#264b59]">The page you are looking for doesn't exist or has been moved</p>
          <NuxtLink to="/">
            <Button size="lg">Go to Homepage</Button>
          </NuxtLink>
        </div>
      </div>
    </div>
    <NewsletterSubscribe />
  </main>
  <TheFooter />
</template>

<style>
.error-container {
  background: url("/images/404.png") no-repeat center/cover;
}
</style>