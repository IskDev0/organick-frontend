<script setup lang="ts">
import DataTable from "~/components/admin/users/data-table/DataTable.vue";
import { useUsersStore } from "~/stores/admin/users";
import {columns} from "~/components/admin/users/data-table/columns"

definePageMeta({
  layout: "admin"
})

const {getUsers, getRoles} = useUsersStore()
const {users} = storeToRefs(useUsersStore())

onMounted(() => {
  getUsers()
  getRoles()
})
</script>

<template>
<DataTable :columns="columns" :data="users"/>
</template>