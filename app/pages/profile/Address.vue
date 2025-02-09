<script setup lang="ts">
import { useUserAddressStore } from "~/stores/profile/user-address";
import AddressList from "~/components/profile/address/AdressList.vue";
import AddAddressModal from "~/components/profile/address/AddAddressModal.vue";

definePageMeta({
  layout: "profile",
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
  <AddressList class="mt-10" v-if="userAddresses.length > 0" :addresses="userAddresses" />
  <div class="flex flex-col items-center justify-center h-full gap-4" v-else>
    <p class="text-3xl font-bold text-center">No addresses yet</p>
    <AddAddressModal
      :is-open="isAddAddressModalOpen"
      @update:open="isAddAddressModalOpen = $event" />
  </div>
</template>