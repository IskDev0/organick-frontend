<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Spinner } from "~/components/ui/spinner";
import { useToast } from "~/components/ui/toast";
import { useAuthStore } from "~/stores/auth";

const { toast } = useToast();

const isLoading = ref<boolean>(false);

const loginSchema = toTypedSchema(
  z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "Invalid email address" }),
    password: z
      .string({ required_error: "Password is required" })
      .min(5, { message: "Password must be at least 5 characters" }),
  }),
);

const form = useForm({
  validationSchema: loginSchema,
});

const submitLogin = form.handleSubmit(async (values) => {
  isLoading.value = true;
  const result = await login(values.email, values.password);

  if (result !== true) {
    toast({
      title: "Error",
      description: result.message,
      variant: "destructive",
    });
  }

  isLoading.value = false;
});

const showPassword = ref<boolean>(false);

definePageMeta({
  layout: "auth",
});

const { login } = useAuthStore();
</script>

<template>
  <section class="bg-[#F9F8F8] dark:bg-zinc-900">
    <div class="h-dvh max-w-xl mx-auto flex items-center justify-center">
      <div class="w-full bg-white dark:bg-zinc-800 p-8 rounded-2xl mx-4">
        <h1 class="text-5xl font-bold text-center mb-4">Login</h1>
        <form class="flex flex-col gap-4" @submit="submitLogin">
          <FormField v-slot="{ componentField }" name="email">
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  v-bind="componentField" />
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
            <span v-if="!isLoading">Login</span>
            <Spinner v-else />
          </Button>
        </form>

        <p class="text-center mt-4">
          Don't have an account?
          <NuxtLink to="/auth/register" class="font-bold">Register</NuxtLink>
        </p>
      </div>
    </div>
  </section>
</template>