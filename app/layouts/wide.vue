<template>
  <TheHeader />
  <slot />
  <NewsletterSubscribe />
  <TheFooter />
  <Toaster />
</template>
<script setup lang="ts">
import Toaster from "../components/ui/toast/Toaster.vue";
import TheHeader from "~/components/common/TheHeader.vue";
import NewsletterSubscribe from "~/components/common/NewsletterSubscribe.vue";
import TheFooter from "~/components/common/TheFooter.vue";
</script>
