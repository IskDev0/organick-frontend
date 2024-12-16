<script setup lang="ts">
import { useUserAddressStore } from "~/stores/profile/user-address";
import AddressList from "~/components/profile/address/AdressList.vue";
import AddAddressModal from "~/components/profile/address/AddAddressModal.vue";

definePageMeta({
  layout: "profile",
  middleware: "access",
});

const { $apiClient } = useNuxtApp();

const { getUserAddresses } = useUserAddressStore();
const { userAddresses } = storeToRefs(useUserAddressStore());
const newAddress = ref({});

onMounted(() => {
  getUserAddresses();
});

const isAddAddressModalOpen = ref<boolean>(false);
</script>

<template>
  <h1 class="text-3xl font-bold mb-10">My Addresses</h1>
  <AddAddressModal
    :is-open="isAddAddressModalOpen"
    @update:open="isAddAddressModalOpen = $event" />
  <AddressList class="mt-10" v-if="userAddresses.length > 0" :addresses="userAddresses" />
  <p v-else class="text-3xl font-bold text-center">No addresses yet</p>
</template>