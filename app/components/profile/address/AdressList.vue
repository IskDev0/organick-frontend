<script setup lang="ts">
import type { IAddress } from "~/types/profile/IAddress";
import AddressItem from "~/components/profile/address/AddressItem.vue";

defineProps<{
  addresses: IAddress[]
}>()
</script>

<template>
<div v-auto-animate class="flex flex-col gap-4">
  <AddressItem
    v-for="address in addresses"
    :key="address.id"
    :address="address" />
</div>
</template>