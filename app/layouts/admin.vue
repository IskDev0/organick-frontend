<script setup lang="ts">
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
</script>

<template>
  <SidebarProvider>
    <AdminSidebar />
    <SidebarInset class="w-full p-4 bg-gray-50 dark:bg-zinc-900">
      <SidebarTrigger />
      <slot />
    </SidebarInset>
  </SidebarProvider>
</template>