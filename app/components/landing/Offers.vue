<script setup lang="ts">
//TODO: Make it dynamic
</script>

<template>
  <section class="container">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div
        class="offer-banner-1 h-[300px] sm:pl-14 text-white rounded-2xl">
        <div
          class="bg-white bg-opacity-30 sm:bg-transparent w-full h-full flex flex-col items-center md:items-start justify-center">
          <h3 class="font-yellowtail text-2xl">Natural!!</h3>
          <p class="text-4xl font-extrabold">
            Get Garden <br />
            Fresh Fruits
          </p>
        </div>
      </div>
      <div
        class="offer-banner-2 h-[300px] flex flex-col items-center justify-center sm:items-start sm:pl-14 rounded-2xl">
        <div
          class="bg-white bg-opacity-30 sm:bg-transparent w-full h-full flex flex-col items-center md:items-start justify-center">
          <h3 class="font-yellowtail text-2xl">Offer!!</h3>
          <p class="text-4xl font-extrabold">
            Get 10% off <br />
            on Vegetables
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.offer-banner-1 {
  background: url("/images/landing/banner-1.png") no-repeat center/cover;
}

.offer-banner-2 {
  background: url("/images/landing/banner-2.png") no-repeat center/cover;
}
</style>
