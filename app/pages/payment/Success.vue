<script setup lang="ts">
import { Button } from "~/components/ui/button";
</script>

<template>
<section class="flex flex-col items-center justify-center gap-4">
  <h1 class="text-5xl font-bold">Your payment is successful</h1>
  <NuxtLink to="/">
    <Button>Home</Button>
  </NuxtLink>
</section>
</template>