<template>
  <main>
    <slot />
  </main>
  <Toaster/>
</template>
<script setup lang="ts">
import { Toaster } from "~/components/ui/toast";
</script>