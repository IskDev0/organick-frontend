<script setup lang="ts">
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
</script>

<template>
  <SidebarProvider>
    <AdminSidebar />
    <main class="w-full p-4 bg-gray-50 dark:bg-zinc-900">
      <SidebarTrigger />
      <slot />
    </main>
  </SidebarProvider>
</template>