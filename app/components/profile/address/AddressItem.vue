<script setup lang="ts">
import type { IAddress } from "~/types/profile/IAddress";
import { Button } from "~/components/ui/button";
import { useUserAddressStore } from "~/stores/profile/user-address";
import { useToast } from "~/components/ui/toast";
import UpdateAddressModal from "~/components/profile/address/UpdateAddressModal.vue";

defineProps<{
  address: IAddress
}>()

const {toast} = useToast()

const {deleteUserAddress, getUserAddresses} = useUserAddressStore()

async function deleteAddress(id: number):Promise<void> {
  try {
    await deleteUserAddress(id)
    await getUserAddresses()
    toast({
      title: "Success",
      description: "Address deleted successfully"
    })
  }catch (error){
    console.error(error);
    toast({
      title: "Error",
      description: error.data.message,
      variant: "destructive"
    })
  }
}

const isUpdateModalOpen = ref<boolean>(false)
</script>

<template>
<article class="flex items-start justify-between bg-gray-100 dark:bg-zinc-900 p-5 rounded-2xl">
  <div class="flex items-center gap-4">
    <div class="flex flex-col gap-2 font-bold">
      <p>Address</p>
      <p>Country</p>
      <p>State</p>
      <p>City</p>
      <p>Postal Code</p>
    </div>
    <div class="flex flex-col gap-2">
      <p>{{address.address_line1}} {{address.address_line2 ? address.address_line2 : ""}}</p>
      <p>{{address.country}}</p>
      <p>{{address.state}}</p>
      <p>{{address.city}}</p>
      <p>{{address.postal_code}}</p>
    </div>
  </div>
  <div class="flex flex-col gap-4">
    <UpdateAddressModal
      :update-address="address"
      :is-open="isUpdateModalOpen"
    @update:open="isUpdateModalOpen = $event"
    />
    <Button @click="deleteAddress(address.id)" variant="ghost">
      <Icon size="20" name="mingcute:delete-2-line"/>
    </Button>
  </div>
</article>
</template>