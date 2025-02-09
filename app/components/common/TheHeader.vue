<script setup lang="ts">
import MobileMenu from "~/components/common/MobileMenu.vue";
import { Button } from "~/components/ui/button";
import { useCartStore } from "~/stores/cart";
import { SwitchRoot } from "radix-vue";
import { Switch } from "~/components/ui/switch";

const showMobileMenu = ref<boolean>(false);

const {userInfo} = storeToRefs(useAuthStore())

const isUserLoggedIn = computed(() => {
  return userInfo.value !== null
})

const { cartItems } = storeToRefs(useCartStore())

const colorMode = useColorMode();

const isDark = computed(() => {
  return colorMode.preference === "dark";
})

const toggleTheme = () => {
  colorMode.preference = colorMode.preference === "light" ? "dark" : "light";
};
</script>

<template>
  <header
    class="fixed top-0 left-0 right-0 z-50 bg-white py-10 dark:bg-zinc-900">
    <div class="container flex items-center justify-between">
      <NuxtLink to="/">
        <NuxtImg class="h-10" src="/images/logo.svg" alt="Logo" />
      </NuxtLink>
      <nav class="hidden md:block">
        <ul class="flex items-center gap-6 font-bold text-lg">
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
      </nav>
      <div class="flex items-center gap-4 hidden md:flex">
        <ClientOnly>
        <NuxtLink to="/cart">
          <div
            class="border py-2 pl-2 pr-4 rounded-full flex items-center gap-2">
            <div
              class="flex items-center justify-center bg-primary rounded-full w-8 h-8">
              <Icon class="bg-white" size="20" name="ic:round-shopping-cart" />
            </div>
            <span class="text-lg font-semibold">Cart ({{cartItems.length}})</span>
          </div>
        </NuxtLink>
          <NuxtLink v-if="!isUserLoggedIn" to="/auth/login">
            <Button>Login</Button>
          </NuxtLink>
          <NuxtLink v-else to="/profile">
            <div
              class="flex items-center justify-center bg-primary rounded-full w-10 h-10">
              <Icon class="bg-white" size="20" name="ic:round-account-circle" />
            </div>
          </NuxtLink>
          <Switch :checked="isDark" @update:checked="toggleTheme">
            <template #thumb>
              <Icon v-if="isDark" name="lucide:moon" class="size-3" />
              <Icon v-else name="lucide:sun" class="size-3" />
            </template>
          </Switch>
        </ClientOnly>
      </div>
      <div
        @click="showMobileMenu = true"
        class="flex items-center justify-center md:hidden">
        <Icon class="bg-primary text-white p-2" size="24" name="lucide:menu" />
      </div>
    </div>
  </header>
  <MobileMenu v-if="showMobileMenu" @close="showMobileMenu = false" />
</template>
