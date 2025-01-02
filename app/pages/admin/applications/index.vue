<script setup lang="ts">
import { useApplicationsStore } from "~/stores/admin/applications";
import { columns } from "@/components/admin/applications/data-table/columns";
import DataTable from "~/components/admin/applications/data-table/DataTable.vue";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Calendar from "~/components/common/Calendar.vue";
import { Button } from "~/components/ui/button";

definePageMeta({
  layout: "admin",
});

const { getApplications } = useApplicationsStore();
const { applications, applicationsFilters } = storeToRefs(
  useApplicationsStore(),
);

onMounted(() => getApplications());

const statuses = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "new",
    label: "New",
  },
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "accepted",
    label: "Accepted",
  },
  {
    value: "rejected",
    label: "Rejected",
  },
];
</script>

<template>
  <form
    @submit.prevent="getApplications"
    class="grid grid-cols-1 md:grid-cols-2 lg:flex items-end gap-4 my-4 bg-white dark:bg-zinc-800 p-4 rounded-2xl">
    <div class="flex flex-col gap-2 flex-1">
      <span>Search</span>
      <Input
        v-model="applicationsFilters.search"
        placeholder="Name, email, subject" />
    </div>
    <div class="flex flex-col gap-2 flex-1">
      <span>Status</span>
      <Select v-model="applicationsFilters.status">
        <SelectTrigger>
          <SelectValue placeholder="Select a status" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem
              v-for="status in statuses"
              :key="status.value"
              :value="status.value">
              {{ status.label }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <div class="flex flex-col gap-2 flex-1">
      <span>Date</span>
      <Calendar v-model="applicationsFilters.date" range />
    </div>
    <Button type="submit">Search</Button>
  </form>
  <DataTable :columns="columns" :data="applications" />
</template>
