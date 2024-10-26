<script setup lang="ts">
import { Button } from "~/components/ui/button";

definePageMeta({
  layout: "auth",
  middleware: "access",
});

const { userInfo } = storeToRefs(useAuthStore());
const {logout} = useAuthStore()
</script>

<template>
  <pre>{{ userInfo }}</pre>
  <Button @click="logout">Logout</Button>
</template>