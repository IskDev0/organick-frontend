<script setup lang="ts">

import { Button } from "~/components/ui/button";

const links = ref([
  {
    name: 'Personal Info',
    path: '/profile/personal',
    icon: 'ic:round-account-circle'
  },
  {
    name: 'Orders',
    path: '/profile/orders',
    icon: 'lucide:shopping-cart'
  },
  {
    name: 'Address',
    path: '/profile/address',
    icon: 'lucide:map-pin'
  },
  {
    name: 'Reviews',
    path: '/profile/reviews',
    icon: 'lucide:star'
  }
])

const {logout} = useAuthStore()
</script>

<template>
  <div class="flex h-dvh">
    <div class="flex flex-col justify-between w-1/6 bg-slate-100 dark:bg-zinc-900 dark:text-white pt-4">
     <div class="flex flex-col">
       <NuxtLink class="pl-4 pb-3" to="/">
         <NuxtImg src="/images/logo.svg"/>
       </NuxtLink>
       <NuxtLink :to="link.path" v-for="link in links" class="flex items-center gap-2 py-3 pl-4 text-xl font-bold">
         <Icon size="20" :name="link.icon" />
         <span>{{link.name}}</span>
       </NuxtLink>
     </div>
      <Button class="m-4" @click="logout">Logout</Button>
     </div>
    <main class="w-5/6 py-2 px-4">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.active {
  @apply bg-[#7EB693] text-white;
}
</style>