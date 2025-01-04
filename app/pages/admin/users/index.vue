<script setup lang="ts">
import DataTable from "~/components/admin/users/data-table/DataTable.vue";
import { useUsersStore } from "~/stores/admin/users";
import { columns } from "~/components/admin/users/data-table/columns";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "~/components/ui/pagination";

definePageMeta({
  layout: "admin",
});

const { getUsers, getRoles } = useUsersStore();
const { users, roles, userFilters, usersPaginationInfo } =
  storeToRefs(useUsersStore());

onMounted(() => {
  getUsers();
  getRoles();
});
</script>

<template>
  <form
    @submit.prevent="getUsers"
    class="flex flex-col w-full items-stretch md:flex-row items-end gap-4 my-4">
    <div class="flex flex-col gap-2 flex-1">
      <span>Search</span>
      <Input v-model="userFilters.search" placeholder="Name, Email" />
    </div>
    <div class="flex flex-col gap-2 flex-1">
      <span>Role</span>
      <Select v-model="userFilters.roleId">
        <SelectTrigger>
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="0">All</SelectItem>
            <SelectItem v-for="role in roles" :key="role.id" :value="role.id">
              {{ role.name }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <Button type="submit">Search</Button>
  </form>
  <DataTable :columns="columns" :data="users" />
  <Pagination
    class="my-4"
    v-if="users"
    v-slot="{ page }"
    :total="usersPaginationInfo?.total"
    :items-per-page="usersPaginationInfo?.limit"
    :sibling-count="1"
    show-edges
    :default-page="1">
    <PaginationList
      v-slot="{ items }"
      class="flex items-center justify-center gap-1">
      <PaginationFirst
        @click="handlePagination('first', getUsers, usersPaginationInfo)" />
      <PaginationPrev
        @click="handlePagination('prev', getUsers, usersPaginationInfo)" />

      <template v-for="(item, index) in items">
        <PaginationListItem
          v-if="item.type === 'page'"
          :key="index"
          :value="item.value"
          as-child>
          <Button
            @click="
              handlePagination(
                'specific',
                getUsers,
                usersPaginationInfo,
                item.value,
              )
            "
            class="w-10 h-10 p-0"
            :variant="item.value === page ? 'default' : 'outline'">
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext
        @click="handlePagination('next', getUsers, usersPaginationInfo)" />
      <PaginationLast
        @click="handlePagination('last', getUsers, usersPaginationInfo)" />
    </PaginationList>
  </Pagination>
</template>
