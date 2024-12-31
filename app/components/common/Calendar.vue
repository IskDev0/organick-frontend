<script setup lang="ts">
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

interface Props {
  modelValue: Date | string | [Date, Date] | [string];
  placeholder?: string;
  range?: boolean;
  readonly?: boolean;
  monthPicker?: boolean;
  timePicker?: boolean;
  yearPicker?: boolean;
  weekPicker?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: "Select date",
});

const emit = defineEmits<{
  (
    e: "update:modelValue",
    value: Date | string | [Date, Date] | [string] | null | number
  ): void;
}>();

const dateFormat = computed((): string => {
  if (props.monthPicker) return "MMM yyyy";
  if (props.timePicker) return "HH:mm";
  if (props.weekPicker) return "dd.MM.yyyy";
  return "dd.MM.yyyy";
});

function handleUpdate(value: number | null) {
  if (value === null) {
    emit("update:modelValue", null)
    return
  }
  const emitValue = Math.floor(value / 1000).toString()
  emit("update:modelValue", emitValue)
}

const colorMode = useColorMode()

const isDark = computed(() => {
  return colorMode.value === 'dark'
})
</script>

<template>
  <VueDatePicker
    :model-value="props.modelValue * 1000"
    @update:model-value="handleUpdate"
    model-type="timestamp"
    :placeholder="props.placeholder"
    :range="props.range"
    :format="dateFormat"
    :readonly="props.readonly"
    auto-apply
    teleport
    :dark="isDark"
  />
</template>

<style>

.dp__theme_light {
  --dp-background-color: #fff;
  --dp-text-color: #212121;
  --dp-hover-color: #f3f3f3;
  --dp-hover-text-color: #212121;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #264b59;
  --dp-primary-disabled-color: #6bacea;
  --dp-primary-text-color: #f8f5f5;
  --dp-secondary-color: #c0c4cc;
  --dp-border-color: #ddd;
  --dp-menu-border-color: #ddd;
  --dp-border-color-hover: #aaaeb7;
  --dp-border-color-focus: #aaaeb7;
  --dp-disabled-color: #f6f6f6;
  --dp-scroll-bar-background: #f3f3f3;
  --dp-scroll-bar-color: #959595;
  --dp-success-color: #76d275;
  --dp-success-color-disabled: #a3d9b1;
  --dp-icon-color: #959595;
  --dp-danger-color: #ff6f60;
  --dp-marker-color: #ff6f60;
  --dp-tooltip-color: #fafafa;
  --dp-disabled-color-text: #8e8e8e;
  --dp-highlight-color: rgb(25 118 210 / 10%);
  --dp-range-between-dates-background-color: var(--dp-hover-color, #f3f3f3);
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, #212121);
  --dp-range-between-border-color: var(--dp-hover-color, #f3f3f3);
}

.dp__theme_dark {
  --dp-background-color: #0f0f0f;
  --dp-text-color: #fff;
  --dp-hover-color: #18181b;
  --dp-hover-text-color: #fff;
  --dp-hover-icon-color: #959595;
  --dp-primary-color: #264b59;
  --dp-primary-disabled-color: #61a8ea;
  --dp-primary-text-color: #fff;
  --dp-secondary-color: #a9a9a9;
  --dp-border-color: #1e293b;
  --dp-menu-border-color: #000000;
  --dp-border-color-hover: #1e293b;
  --dp-border-color-focus: #aaaeb7;
  --dp-disabled-color: #737373;
  --dp-disabled-color-text: #d0d0d0;
  --dp-scroll-bar-background: #212121;
  --dp-scroll-bar-color: #484848;
  --dp-success-color: #00701a;
  --dp-success-color-disabled: #428f59;
  --dp-icon-color: #959595;
  --dp-danger-color: #e53935;
  --dp-marker-color: #e53935;
  --dp-tooltip-color: #3e3e3e;
  --dp-highlight-color: rgb(0 92 178 / 20%);
  --dp-range-between-dates-background-color: var(--dp-hover-color, #484848);
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);
  --dp-range-between-border-color: var(--dp-hover-color, #fff);
}
</style>
