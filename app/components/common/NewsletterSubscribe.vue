<script setup lang="ts">
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { useToast } from "~/components/ui/toast";

const { toast } = useToast();

const email = ref<string>("");

async function subscribe() {
  try {
    const response = await $fetch<{ message: string }>(
      "http://localhost:8080/api/v1/subscription",
      {
        method: "POST",
        body: {
          email: email.value,
        },
      },
    );
    toast({
      title: "Success",
      description: response.message,
    });
    email.value = "";
  } catch (error) {
    toast({
      title: "Error",
      description: error.data.message,
      variant: "destructive",
    });
  }
}
</script>

<template>
  <section class="container">
    <div class="newsletter h-[300px] rounded-xl mt-20">
      <div class="h-full flex flex-col md:flex-row justify-center md:justify-between items-center px-10 gap-4">
        <h4 class="font-bold text-2xl md:text-3xl lg:text-5xl text-white">
          Subscribe to <br />
          our Newsletter
        </h4>
        <form @submit.prevent="subscribe" class="flex flex-col w-full md:w-auto  md:flex-row items-center gap-2">
          <Input
            v-model="email"
            type="email"
            placeholder="Your Email Address" />
          <Button
            class="w-full md:w-auto"
            type="submit"
            size="lg"
            :disabled="email.length === 0">Subscribe</Button>
        </form>
      </div>
    </div>
  </section>
</template>

<style scoped>
.newsletter {
  background: url("/images/newsletter-background.png") no-repeat center/cover;
}
</style>