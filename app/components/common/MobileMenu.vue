<script setup lang="ts">
import { Button } from "~/components/ui/button";
import { Switch } from "~/components/ui/switch";

const emit = defineEmits<{
  (e: "close"): void;
}>();

const {userInfo} = storeToRefs(useAuthStore())

const colorMode = useColorMode();

const isDark = computed(() => {
  return colorMode.preference === "dark";
})

const toggleTheme = () => {
  colorMode.preference = colorMode.preference === "light" ? "dark" : "light";
};
</script>
<template>
  <div
    class="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen z-50 bg-white flex flex-col items-center justify-center dark:bg-zinc-900">
    <ul class="flex flex-col items-center gap-2 font-bold text-lg mt-auto">
      <li>
        <NuxtLink to="/products">Products</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/about">About</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/news">News</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/contact">Contact</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/team">Team</NuxtLink>
      </li>
    </ul>
    <div class="flex items-center gap-4 mt-auto mb-10">
      <NuxtLink to="/cart">
        <div class="border py-2 pl-2 pr-4 rounded-full flex items-center gap-2">
          <div
            class="flex items-center justify-center bg-primary rounded-full w-8 h-8">
            <Icon class="bg-white" size="20" name="ic:round-shopping-cart" />
          </div>
          <span class="text-primary dark:text-white">Cart</span>
        </div>
      </NuxtLink>
      <NuxtLink v-if="!userInfo" to="/auth/login">
        <Button size="lg">Login</Button>
      </NuxtLink>
      <NuxtLink v-else to="/profile">
        <div class="border py-2 pl-2 pr-4 rounded-full flex items-center gap-2">
          <div
            class="flex items-center justify-center bg-primary rounded-full w-8 h-8">
            <Icon class="bg-white" size="20" name="ic:round-account-circle" />
          </div>
          <span class="text-primary dark:text-white">Profile</span>
        </div>
      </NuxtLink>
      <Switch :checked="isDark" @update:checked="toggleTheme">
        <template #thumb>
          <Icon v-if="isDark" name="lucide:moon" class="size-3" />
          <Icon v-else name="lucide:sun" class="size-3" />
        </template>
      </Switch>
    </div>
    <button @click="emit('close')" class="absolute top-12 right-8">
      <Icon class="bg-primary" size="24" name="lucide:x" />
    </button>
  </div>
</template>
