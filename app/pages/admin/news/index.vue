<script setup lang="ts">

import TextEditor from "~/components/admin/news/TextEditor.vue";
import { Button } from "~/components/ui/button";

definePageMeta({
  layout: "admin"
})

const { $apiClient } = useNuxtApp();

const post = ref()

async function addPost(){
  try {
    await $apiClient("/news", {
      method: "POST",
      body: {
        title: String(Math.floor(Math.random() * 100)),
        shortDescription: String(Math.floor(Math.random() * 100)),
        preview: String(Math.floor(Math.random() * 100)),
        content: post.value
      }
    })
  }catch (error){
    console.error(error);
  }
}
</script>

<template>
<TextEditor v-model="post"/>
  <Button @click="addPost">Add</Button>
</template>