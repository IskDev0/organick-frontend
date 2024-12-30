<script setup lang="ts">
interface TeamMember {
  id: number;
  firstName: string;
  lastName: string;
  position: string;
  image: string;
  instagram: string | null;
  facebook: string | null;
  linkedin: string | null;
  twitter: string | null;
}

defineProps<{
  teamMember: TeamMember;
}>();
</script>

<template>
  <article class="flex flex-col">
    <NuxtImg
      :src="teamMember.image"
      :alt="teamMember.firstName + ' ' + teamMember.lastName" />
    <div class="flex flex-col bg-white dark:bg-zinc-800 p-4 rounded-b-2xl">
      <h3 class="text-xl md:text-2xl font-bold">
        {{ teamMember.firstName }} {{ teamMember.lastName }}
      </h3>
      <div class="flex items-center justify-between">
        <p class="text-[#7EB693] text-md md:text-xl font-yellowtail">
          {{ teamMember.position }}
        </p>
        <div class="flex gap-4">
          <NuxtLink
            :to="teamMember.instagram"
            target="_blank"
            v-if="teamMember.instagram">
            <Icon name="ri:instagram-line" />
          </NuxtLink>
          <NuxtLink
            :to="teamMember.facebook"
            target="_blank"
            v-if="teamMember.facebook">
            <Icon name="ri:facebook-circle-fill" />
          </NuxtLink>
          <NuxtLink
            :to="teamMember.linkedin"
            target="_blank"
            v-if="teamMember.linkedin">
            <Icon name="ri:linkedin-fill" />
          </NuxtLink>
          <NuxtLink
            :to="teamMember.twitter"
            target="_blank"
            v-if="teamMember.twitter">
            <Icon name="ri:twitter-fill" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </article>
</template>
