<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from 'vue';
import { Button } from '~/components/ui/button';

// Тип для принимаемых пропсов
interface Props {
  maxPreviewWidth?: number;
  accept?: string;
  uploadLabel?: string;
  previewAltText?: string;
}

withDefaults(defineProps<Props>(), {
  maxPreviewWidth: 300,
  accept: 'image/*',
  uploadLabel: 'Click to upload an image',
  previewAltText: 'Preview',
})

// Определение событий
const emit = defineEmits<{
  (e: 'update:image', file: File): void;
  (e: 'remove'): void;
}>();

// Состояния компонента
const selectedImage = ref<File | null>(null);
const previewUrl = ref<string | null>(null);

// Обработчик изменения файла
const handleFileChange = (event: Event): void => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0] || null;

  if (file) {
    selectedImage.value = file;
    previewUrl.value = URL.createObjectURL(file);
    emit('update:image', file);
  }
};

// Обработчик удаления файла
const removeImage = (): void => {
  selectedImage.value = null;
  previewUrl.value = null;
  emit('remove');
};

// Очистка URL при изменении
watch(previewUrl, (newVal, oldVal) => {
  if (!newVal && oldVal) URL.revokeObjectURL(oldVal);
});
</script>

<template>
  <div class="image-uploader">
    <!-- Секция загрузки -->
    <div
      v-if="!previewUrl"
      class="upload-section border-dashed border-2 border-gray-300 rounded-lg flex items-center justify-center text-center text-gray-600 hover:bg-gray-100 cursor-pointer dark:text-gray-400 dark:hover:bg-zinc-700"
      @click="$refs.fileInput.click()"
    >
      {{ uploadLabel }}
    </div>

    <!-- Скрытое поле для загрузки файла -->
    <input
      type="file"
      :accept="accept"
      class="hidden"
      ref="fileInput"
      @change="handleFileChange($event)"
    />

    <!-- Превью и кнопка удаления -->
    <div v-if="previewUrl" class="relative flex flex-col items-center gap-2 bg-gray-50 dark:bg-zinc-700 p-4 rounded-lg">
      <img
        :src="previewUrl"
        :alt="previewAltText"
        class="max-w-full max-h-[200px] aspect-square rounded border"
      />
      <Button variant="secondary" @click="removeImage">Remove</Button>
    </div>
  </div>
</template>

<style scoped>
.upload-section {
  width: 100%;
  height: 150px; /* Задайте подходящую высоту */
}
.image-uploader img {
  height: auto;
}
</style>
