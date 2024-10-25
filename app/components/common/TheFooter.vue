<script setup lang="ts">
import { Separator } from "~/components/ui/separator";
</script>

<template>
  <footer class="container my-10">
    <div class="flex flex-col gap-8 md:flex-row items-start justify-between">
      <div class="flex flex-col gap-2">
        <NuxtLink to="/">
          <NuxtImg src="images/logo.svg" />
        </NuxtLink>
        <p class="max-w-lg text-[#525C60] dark:text-gray-300">
          Simply dummy text of the printing and typesetting industry. Lorem
          Ipsum simply dummy text of the printing
        </p>
        <div class="flex items-center gap-2">
          <a
            class="flex items-center justify-center w-12 h-12 rounded-full bg-[#EFF6F1] dark:bg-zinc-800"
            target="_blank"
            href="https://instagram.com">
            <Icon name="ri:instagram-line" />
          </a>
          <a
            class="flex items-center justify-center w-12 h-12 rounded-full bg-[#EFF6F1] dark:bg-zinc-800"
            target="_blank"
            href="https://facebook.com">
            <Icon name="ri:facebook-circle-fill" />
          </a>
          <a
            class="flex items-center justify-center w-12 h-12 rounded-full bg-[#EFF6F1] dark:bg-zinc-800"
            target="_blank"
            href="https://twitter.com">
            <Icon name="ri:twitter-fill" />
          </a>
          <a
            class="flex items-center justify-center w-12 h-12 rounded-full bg-[#EFF6F1] dark:bg-zinc-800"
            target="_blank"
            href="https://pinterest.com">
            <Icon name="ri:pinterest-fill" />
          </a>
        </div>
      </div>

      <div class="flex flex-col gap-4">
        <h3 class="text-lg font-bold">Contact Us</h3>
        <div class="flex flex-col gap-2">
          <div class="flex flex-col gap-2">
            <span class="font-bold">Email</span>
            <a href="mailto:needhelp@Organia.com">needhelp@Organia.com</a>
          </div>
          <div class="flex flex-col gap-2">
            <span class="font-bold">Phone</span>
            <a href="tel:666888888">666 888 888</a>
          </div>
          <div class="flex flex-col gap-2">
            <span class="font-bold">Address</span>
            <a href="https://maps.app.goo.gl/8VVZHdeSzKHENwLr7"
              >88 road, Brooklyn street, USA</a
            >
          </div>
        </div>
      </div>
    </div>
    <Separator class="my-4" />
    <p class="text-center text-[#525C60] dark:text-gray-300">
      Copyright © <span class="font-bold">Organick</span>
    </p>
  </footer>
</template>
