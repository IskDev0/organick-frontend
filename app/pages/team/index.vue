<script setup lang="ts">
const { $apiClient } = useNuxtApp();

interface TeamMember {
  id: number;
  first_name: string;
  last_name: string;
  position: string;
  image: string;
  instagram: string | null;
  facebook: string | null;
  linkedin: string | null;
  twitter: string | null;
}

const teamMembers = ref<TeamMember[]>([]);

async function getTeam(): Promise<void> {
  try {
    teamMembers.value = await $apiClient("/other/team");
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => getTeam());
</script>

<template>
  <div class="flex flex-col items-center text-center gap-2 max-w-xl mx-auto">
    <p class="text-2xl font-yellowtail text-[#7EB693]">Team</p>
    <h1 class="font-extrabold text-2xl md:text-5xl mt-2 mb-4">
      Our Organic Experts
    </h1>
    <p>
      Simply dummy text of the printing and typesetting industry. Lorem had
      ceased to been the industry's standard dummy text ever since the 1500s,
      when an unknown printer took a galley.
    </p>
  </div>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-10">
    <TeamMemberCard
      v-for="teamMember in teamMembers"
      :key="teamMember.id"
      :team-member="teamMember" />
  </div>
</template>
