<script setup lang="ts">
import { Input } from "~/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "~/components/ui/button";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useToast } from "~/components/ui/toast";

definePageMeta({
  layout: "profile",
  middleware: "access",
});

const { toast } = useToast();

const formSchema = toTypedSchema(
  z.object({
    first_name: z.string().min(2).max(50),
    last_name: z.string().min(2).max(50),
    email: z.string().email(),
    phone: z.string(),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
  try {
    updateUserInfo(values);
    toast({
      title: "Success",
      description: "User info updated successfully",
    });
  } catch (error) {
    console.log(error);
    toast({
      title: "Error",
      description: error.data.message,
      variant: "destructive",
    });
  }
});

const { userInfo } = storeToRefs(useAuthStore());
const { updateUserInfo } = useUserStore();

onMounted(() => {
  if (userInfo.value) {
    form.setValues({
      first_name: userInfo.value.first_name,
      last_name: userInfo.value.last_name,
      email: userInfo.value.email,
      phone: userInfo.value.phone,
    });
  }
});
</script>

<template>
  <form v-if="userInfo" @submit="onSubmit">
    <h1 class="text-3xl font-bold mb-4">Main Info</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField v-slot="{ componentField }" name="first_name">
        <FormItem>
          <FormLabel>First Name</FormLabel>
          <FormControl>
            <Input v-model="userInfo.first_name" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="last_name">
        <FormItem>
          <FormLabel>Last Name</FormLabel>
          <FormControl>
            <Input v-model="userInfo.last_name" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input v-model="userInfo.email" v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="phone">
        <FormItem>
          <FormLabel>Phone</FormLabel>
          <FormControl>
            <Input
              v-maska="'+1 (###) ###-##-##'"
              v-model="userInfo.phone"
              v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <Button class="mt-4" type="submit">Update</Button>
  </form>
</template>
