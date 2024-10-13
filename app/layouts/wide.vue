<template>
  <TheHeader/>
  <slot />
  <Toaster />
</template>
<script setup lang="ts">
import Toaster from "../components/ui/toast/Toaster.vue";
import TheHeader from "~/components/common/TheHeader.vue";
</script>
