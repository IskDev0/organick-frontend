<script lang="ts" setup>
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ref } from "vue";
import { Badge } from "~/components/ui/badge";
import { useUsersStore } from "~/stores/admin/users";
import { useToast } from "~/components/ui/toast";

const { roles } = storeToRefs(useUsersStore());
const { updateUserRole, getUsers } = useUsersStore();

const { toast } = useToast();

const props = defineProps<{
  role: string;
  id: string;
}>();

const currentRole = ref();

async function handleChangeRole() {
  console.log(currentRole.value);
  console.log(currentRole.value.id);
  try {
    await updateUserRole(props.id, currentRole.value.id);
    toast({ title: "Role updated successfully" });
    await getUsers();
  } catch (error) {
    console.error(error);
    toast({
      title: "Error",
      description: error.data.message,
      variant: "destructive",
    });
  }
}
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Badge class="cursor-pointer">{{ role }}</Badge>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuSeparator />
      <DropdownMenuRadioGroup
        v-model="currentRole"
        @update:modelValue="handleChangeRole">
        <DropdownMenuRadioItem v-for="role in roles" :key="role" :value="role">
          {{ role.name }}
        </DropdownMenuRadioItem>
      </DropdownMenuRadioGroup>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
