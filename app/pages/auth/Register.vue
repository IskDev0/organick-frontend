<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import {Spinner} from "~/components/ui/spinner";
import { useAuthStore } from "~/stores/auth";

const isLoading = ref<boolean>(false);

const registerSchema = toTypedSchema(
  z.object({
    first_name: z
      .string({ required_error: "First name is required" }),
    last_name: z
      .string({ required_error: "Last name is required" }),
    phone: z
      .string({ required_error: "Phone is required" }),
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(5, { message: "Password must be at least 5 characters" }),
  }),
);

const form = useForm({
  validationSchema: registerSchema,
});

const submitLogin = form.handleSubmit(async (values) => {
  await register(values)
});

const showPassword = ref<boolean>(false);

definePageMeta({
  layout: "auth",
  middleware: "access",
});

const { register } = useAuthStore();
</script>

<template>
  <section class="h-dvh max-w-xl mx-auto flex items-center justify-center">
    <div class="w-full">
      <h1 class="text-5xl font-bold">Register</h1>
      <form class="flex flex-col gap-4" @submit="submitLogin">

        <FormField v-slot="{ componentField }" name="first_name">
          <FormItem>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input type="text" placeholder="First Name" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="last_name">
          <FormItem>
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Last Name" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="phone">
          <FormItem>
            <FormLabel>Phone</FormLabel>
            <FormControl>
              <Input type="text" placeholder="Phone" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="email">
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input type="email" placeholder="Email" v-bind="componentField" />
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="password">
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <div class="relative w-full items-center">
                <Input
                  v-bind="componentField"
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Password" />
                <span
                  @click="showPassword = !showPassword"
                  class="absolute end-0 inset-y-0 flex items-center justify-center px-2">
                  <Icon
                    :name="showPassword ? 'lucide:eye-off' : 'lucide:eye'"
                    class="size-6 text-muted-foreground cursor-pointer" />
                </span>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>
        <Button class="w-full" type="submit" :disabled="isLoading">
          <span v-if="!isLoading">Register</span>
          <Spinner v-else />
        </Button>
      </form>
      <p class="text-center mt-4">
        Already have an account?
        <NuxtLink to="/auth/login" class="font-bold">Login</NuxtLink>
      </p>
    </div>
  </section>
</template>
