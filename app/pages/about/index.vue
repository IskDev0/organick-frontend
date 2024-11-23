<script setup lang="ts">
import { Button } from "~/components/ui/button";

definePageMeta({
  layout: "wide",
});

const { $apiClient } = useNuxtApp();

//TODO: Redraw icons as svg

const teamMembers = ref([]);

async function getTeamMembers() {
  try {
    let data = await $apiClient("/other/team");
    if (data) {
      teamMembers.value = data.slice(0, 3);
    }
  } catch (error) {
    console.error(error);
  }
}

onMounted(async () => await Promise.all([getTeamMembers()]));
</script>

<template>
  <section
    class="flex flex-col md:flex-row items-center justify-between gap-10 container mt-40">
    <div class="w-full w-1/2">
      <NuxtImg class="w-full" src="/images/about/hero.png" alt="About hero" />
    </div>
    <div class="w-full w-1/2">
      <p class="text-[#7EB693] font-yellowtail text-2xl">About Us</p>
      <h1 class="font-black text-5xl">
        We do Creative <br />
        Things for Success
      </h1>
      <div class="flex flex-col gap-4 mt-4 mb-12">
        <p class="text-gray-500">
          Simply dummy text of the printing and typesetting industry. Lorem had
          ceased to been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley.
        </p>
        <p class="text-gray-500">
          Simply dummy text of the printing and typesetting industry. Lorem had
          ceased to been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley.
        </p>
      </div>
      <div
        class="flex flex-col lg:flex-row items-start lg:items-center gap-4 my-10">
        <div class="flex items-center gap-2">
          <NuxtImg src="/images/icons/tractor.svg" />
          <span class="font-bold text-lg"
            >Modern Agriculture <br />
            Equipment
          </span>
        </div>
        <div class="flex items-center gap-2">
          <NuxtImg src="/images/icons/chemical_plant.svg" />
          <span class="font-bold text-lg"
            >No growth <br />
            hormones are used</span
          >
        </div>
      </div>
      <NuxtLink to="/products">
        <Button size="lg">Explore more</Button>
      </NuxtLink>
    </div>
  </section>
  <section class="bg-[#F9F8F8] dark:bg-zinc-900 py-40 mt-20">
    <div class="container">
      <div class="flex flex-col lg:flex-row items-center gap-8">
        <div class="w-full lg:w-1/2">
          <p class="text-[#7EB693] font-yellowtail text-2xl">Why Choose us?</p>
          <h2 class="font-black text-5xl">
            We do not buy from the <br />
            open market & traders.
          </h2>
          <p class="mt-4 mb-8">
            Simply dummy text of the printing and typesetting industry. Lorem
            had ceased to been the industry's standard the 1500s, when an
            unknown
          </p>
          <div
            class="inline-flex items-center gap-2 bg-[#ECECEC] dark:bg-zinc-800 rounded-full py-4 px-6">
            <NuxtImg src="/images/icons/radio.svg" />
            <p class="font-bold">100% Natural Product</p>
          </div>
          <p class="ml-8 max-w-md py-2">
            Simply dummy text of the printing and typesetting industry Lorem
            Ipsum
          </p>
          <div
            class="inline-flex items-center gap-2 bg-[#ECECEC] dark:bg-zinc-800 rounded-full py-4 px-6">
            <NuxtImg src="/images/icons/radio.svg" />
            <p class="font-bold">Increases resistance</p>
          </div>
          <p class="ml-8 max-w-md py-2">
            Filling, and temptingly healthy, our Biona Organic Granola with Wild
            Berries is just the thing
          </p>
        </div>
        <div class="w-full lg:w-1/2">
          <NuxtImg
            class="w-full rounded-3xl"
            src="/images/about/why-us.jpg"
            alt="Why us" />
        </div>
      </div>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:px-24 mt-20">
        <div
          class="flex flex-col items-center text-center gap-4 bg-white dark:bg-zinc-800 p-5 rounded-2xl">
          <div
            class="bg-[#F9F8F8] dark:bg-zinc-700 h-20 w-20 flex items-center justify-center rounded-2xl">
            <NuxtImg src="/images/icons/return_policy.svg" />
          </div>
          <span class="font-bold text-2xl">Return Policy</span>
          <p>Simply dummy text of the printing and typesetting industry.</p>
        </div>
        <div
          class="flex flex-col items-center text-center gap-4 bg-white dark:bg-zinc-800 p-5 rounded-2xl">
          <div
            class="bg-[#F9F8F8] dark:bg-zinc-700 h-20 w-20 flex items-center justify-center rounded-2xl">
            <NuxtImg src="/images/icons/fresh.svg" />
          </div>
          <span class="font-bold text-2xl">100% Fresh</span>
          <p>Simply dummy text of the printing and typesetting industry.</p>
        </div>
        <div
          class="flex flex-col items-center text-center gap-4 bg-white dark:bg-zinc-800 p-5 rounded-2xl">
          <div
            class="bg-[#F9F8F8] dark:bg-zinc-700 h-20 w-20 flex items-center justify-center rounded-2xl">
            <NuxtImg src="/images/icons/support.svg" />
          </div>
          <span class="font-bold text-2xl">Support 24/7</span>
          <p>Simply dummy text of the printing and typesetting industry.</p>
        </div>
        <div
          class="flex flex-col items-center text-center gap-4 bg-white dark:bg-zinc-800 p-5 rounded-2xl">
          <div
            class="bg-[#F9F8F8] dark:bg-zinc-700 h-20 w-20 flex items-center justify-center rounded-2xl">
            <NuxtImg src="/images/icons/secured_payment.svg" />
          </div>
          <span class="font-bold text-2xl">Secured Payment</span>
          <p>Simply dummy text of the printing and typesetting industry.</p>
        </div>
      </div>
    </div>
  </section>
  <section class="container py-20">
    <div class="flex flex-col items-center text-center gap-2">
      <p class="text-[#7EB693] font-yellowtail text-2xl">Team</p>
      <h3 class="font-black text-5xl">Our Organic Experts</h3>
      <p class="text-gray-500 max-w-lg">
        Simply dummy text of the printing and typesetting industry. Lorem had
        ceased to been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley.
      </p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-10">
      <TeamMemberCard
        class="shadow-lg rounded-b-xl"
        v-for="teamMember in teamMembers"
        :key="teamMember.id"
        :team-member="teamMember" />
    </div>
  </section>
  <section class="bg-[#274C5B] dark:bg-zinc-800 py-20">
    <div class="container">
      <div class="flex flex-col items-center gap-2 text-center">
        <p class="text-[#7EB693] font-yellowtail text-2xl">Team</p>
        <h3 class="font-black text-5xl text-white">What We Offer for You</h3>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        <NuxtLink to="/products?category_id=2">
          <article>
            <div class="flex flex-col items-center bg-white dark:bg-zinc-900 p-5 rounded-2xl">
              <NuxtImg src="/images/about/spicy.png" />
              <h3 class="font-bold text-lg pt-5 pb-2">Spicy</h3>
            </div>
          </article>
        </NuxtLink>
        <NuxtLink to="/products?category_id=5">
          <article>
            <div class="flex flex-col items-center bg-white dark:bg-zinc-900 p-5 rounded-2xl">
              <NuxtImg src="/images/about/nuts.png" />
              <h3 class="font-bold text-lg pt-5 pb-2">Nuts & Feesd</h3>
            </div>
          </article>
        </NuxtLink>
        <NuxtLink to="/products?category_id=6">
          <article>
            <div class="flex flex-col items-center bg-white dark:bg-zinc-900 p-5 rounded-2xl">
              <NuxtImg src="/images/about/fruits.png" />
              <h3 class="font-bold text-lg pt-5 pb-2">Fruits</h3>
            </div>
          </article>
        </NuxtLink>
        <NuxtLink to="/products?category_id=1">
          <article>
            <div class="flex flex-col items-center bg-white dark:bg-zinc-900 p-5 rounded-2xl">
              <NuxtImg src="/images/about/vegetables.png" />
              <h3 class="font-bold text-lg pt-5 pb-2">Vegetable</h3>
            </div>
          </article>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
