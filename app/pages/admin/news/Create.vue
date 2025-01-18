<script setup lang="ts">
import TextEditor from "~/components/admin/news/TextEditor.vue";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import { Textarea } from "~/components/ui/textarea";
import { useToast } from "~/components/ui/toast";

definePageMeta({
  layout: "admin",
});

const { $apiClient } = useNuxtApp();
const {toast} = useToast()

const post = ref();

async function addPost(form) {
  try {
    await $apiClient("/news", {
      method: "POST",
      body: form,
    });
    navigateTo("/admin/news")
  } catch (error) {
    console.error(error);
  }
}

const formSchema = toTypedSchema(
  z.object({
    title: z
      .string()
      .min(5, { message: "Title must be at least 5 characters" }),
    shortDescription: z
      .string()
      .min(10, { message: "Description must be at least 10 characters" }),
    content: z
      .string()
      .min(10, { message: "Content must be at least 10 characters" }),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

const submitNews = form.handleSubmit((values) => {
  addPost({
    ...values,
    preview: "https://picsum.photos/200/300"
  });
});
</script>

<template>
  <form
    class="border p-4 rounded-lg bg-white dark:bg-background flex flex-col gap-4"
    @submit="submitNews">
    <FormField v-slot="{ componentField }" name="title">
      <FormItem>
        <FormLabel>Title</FormLabel>
        <FormControl>
          <Input placeholder="Title" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="shortDescription">
      <FormItem>
        <FormLabel>Short Description</FormLabel>
        <FormControl>
          <Textarea placeholder="Description" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="content">
      <FormItem>
        <FormLabel>Short Description</FormLabel>
        <FormControl>
          <TextEditor v-model="post" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button @click="submitNews" type="submit">send</Button>
  </form>
</template>
