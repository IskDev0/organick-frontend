<script setup lang="ts">
import {
  computed,
  onMounted,
  onUpdated,
  ref,
  watch,
  onBeforeUnmount,
} from "vue";
import { Check, ChevronsUpDown } from "lucide-vue-next";
import { useDebounceFn } from "@vueuse/core";

interface Props {
  modelValue: string | null;
  placeholder: string;
  fetchItems?: (query: string) => Promise<any[]>;
  fetchItemDetails?: (id: string) => Promise<any>;
  staticItems?: any[];
  displayField?: keyof any | (keyof any)[];
  value?: string;
  "onUpdate:modelValue"?: (value: string) => void;
}

const props = defineProps<Props>();
const emit = defineEmits(["update:modelValue", "select"]);

const items = ref<any[]>(props.staticItems || []);
const initialQuery = ref(props.modelValue || props.value || ""); // Sync with value
const selectedItem = ref<any | null>(null);
const isLoading = ref<boolean>(false);
const isOpen = ref<boolean>(false);
const comboboxInput = ref<HTMLInputElement>();

const filterStaticItems = () => {
  items.value =
    props.staticItems?.filter((item) =>
      displayFields.value.some((field) =>
        String(item[field])
          .toLowerCase()
          .includes(initialQuery.value.toLowerCase())
      )
    ) || [];
};

const fetchItems = useDebounceFn(async () => {
  if (initialQuery.value.length > 3) {
    if (props.staticItems) {
      filterStaticItems();
    } else if (props.fetchItems) {
      isLoading.value = true;
      try {
        items.value = await props.fetchItems(initialQuery.value);
      } catch (error) {
        console.error(error);
      } finally {
        isLoading.value = false;
      }
    }
  }
}, 700);

const selectItem = (item: any) => {
  selectedItem.value = item;
  const newValue = displayFields.value
    .map((field) => item[field])
    .join(" ");
  initialQuery.value = "";
  emit("update:modelValue", newValue); // Emit for v-model sync
  emit("select", selectedItem.value);
  isOpen.value = false;
};

const toggleOpen = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value && props.staticItems) {
    filterStaticItems();
  }
};

const buttonText = computed(() => {
  if (selectedItem.value) {
    return displayFields.value
      .map((field) => selectedItem.value![field])
      .join(" ");
  }
  return initialQuery.value || props.placeholder;
});

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest(".combobox")) {
    isOpen.value = false;
  }
};

onMounted(async () => {
  if (props.modelValue && props.fetchItemDetails) {
    selectedItem.value = await props.fetchItemDetails(props.modelValue);
    initialQuery.value = "";
  }
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

onUpdated(() => {
  comboboxInput.value?.focus();
});

const displayFields = computed<keyof any[]>(() => {
  return Array.isArray(props.displayField)
    ? props.displayField
    : [props.displayField || "name"];
});

watch(initialQuery, () => {
  if (props.staticItems) {
    filterStaticItems();
  }
});
</script>

<template>
  <div class="relative combobox">
    <button
      type="button"
      @click="toggleOpen"
      class="flex items-center justify-between p-2 border rounded-md w-full font-normal text-sm text-muted-foreground text-left">
      <span>{{ buttonText }}</span>
      <ChevronsUpDown />
    </button>
    <div
      class="absolute z-10 bg-white dark:bg-zinc-900 px-4 rounded-md w-full"
      v-if="isOpen"
    >
      <input
        ref="comboboxInput"
        @input="fetchItems"
        v-model="initialQuery"
        class="border py-1 px-2 rounded-md w-full mt-4 bg-white dark:bg-zinc-800"
        :placeholder="props.placeholder"
      />
      <div
        v-if="isLoading"
        class="bg-white dark:bg-zinc-900 font-medium text-center py-2 text-md"
      >
        Loading...
      </div>
      <ul
        v-else-if="items.length > 0"
        class="border rounded-md absolute z-10 w-full mt-1 bg-white dark:bg-zinc-800 shadow-lg max-h-60 overflow-auto"
      >
        <li
          v-for="item in items"
          :key="item.id"
          @click="selectItem(item)"
          class="flex items-center gap-2 p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-700"
        >
          <span v-for="field in displayFields" :key="field">{{ item[field] }} </span>
          <Check v-if="item.id === selectedItem?.id" />
        </li>
      </ul>
      <div
        v-if="items.length === 0"
        class="bg-white dark:bg-zinc-900 font-medium text-center py-2 text-md"
      >
        Not found
      </div>
    </div>
  </div>
</template>
