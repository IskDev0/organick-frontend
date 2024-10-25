<template>
  <TheHeader/>
  <slot />
  <NewsletterSubscribe/>
  <Toaster />
</template>
<script setup lang="ts">
import Toaster from "../components/ui/toast/Toaster.vue";
import TheHeader from "~/components/common/TheHeader.vue";
import NewsletterSubscribe from "~/components/common/NewsletterSubscribe.vue";
</script>
