<script setup lang="ts">
import { Button } from "~/components/ui/button";
</script>

<template>
  <section class="bg-[#F9F8F8]">
    <div class="flex items-center container">
      <div class="w-1/2">
        <NuxtImg
          class="w-full"
          src="/images/landing/about-section.png"
          alt="About" />
      </div>
      <div class="w-1/2">
        <h2 class="text-2xl font-yellowtail text-[#7EB693]">About Us</h2>
        <p class="font-extrabold text-5xl mt-2 mb-4">
          We Believe in Working <br />
          Accredited Farmers
        </p>
        <p class="text-[#525C60] font-open-sans">
          Simply dummy text of the printing and typesetting industry. Lorem had
          ceased to been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley.
        </p>

        <div class="flex flex-col gap-6 mt-6">
          <div class="flex items-center gap-5">
            <div
              class="bg-white rounded-xl w-16 h-16 flex items-center justify-center">
              <NuxtImg src="/images/icons/bowl.svg" />
            </div>
            <div class="flex flex-col">
              <p class="font-extrabold text-2xl">Organic Foods Only</p>
              <span class="text-[#525C60]"
                >Simply dummy text of the printing and typesetting industry.
                Lorem Ipsum</span
              >
            </div>
          </div>
          <div class="flex items-center gap-5">
            <div
              class="bg-white rounded-xl w-16 h-16 flex items-center justify-center">
              <NuxtImg src="/images/icons/mailbox.svg" />
            </div>
            <div class="flex flex-col">
              <p class="font-extrabold text-2xl">Quality Standards</p>
              <span class="text-[#525C60]"
                >Simply dummy text of the printing and typesetting industry.
                Lorem Ipsum</span
              >
            </div>
          </div>
          <NuxtLink to="/products">
            <Button size="lg">Shop Now</Button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
