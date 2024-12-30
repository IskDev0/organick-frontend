<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { useToast } from "~/components/ui/toast";

const {$apiClient} = useNuxtApp()

const {toast} = useToast()

const applicationSchema = toTypedSchema(
  z.object({
    fullName: z.string().min(5, { message: "Name must be at least 5 characters" }).max(50),
    email: z.string().email({ message: "Invalid email address" }),
    company: z.string().min(5, { message: "Company name must be at least 5 characters" }).max(50),
    subject: z.string().min(5, { message: "Subject must be at least 5 characters" }).max(50),
    message: z.string().min(5, { message: "Message must be at least 5 characters" }).max(500),
  }),
);

const form = useForm({
  validationSchema: applicationSchema,
});

const onSubmit = form.handleSubmit(async (values) => {
  await sendApplication()
});

function clearForm(){
  form.handleReset();
}

async function sendApplication():Promise<void>{
  try {
    await $apiClient("/applications", {
      method: "POST",
      body: {
        fullName: form.values.fullName,
        email: form.values.email,
        company: form.values.company,
        subject: form.values.subject,
        message: form.values.message,
      },
    });
    clearForm()
    toast({
      title: "Success",
      description: "Your application has been sent successfully"
    })
  } catch (error) {
    console.error(error);
    toast({
      title: "Error",
      description: error.data.message,
      variant: "destructive",
    })
  }
}
</script>

<template>
  <section
    class="flex flex-col lg:flex-row items-center justify-between gap-16">
    <div class="w-full lg:w-1/2">
      <NuxtImg
        class="rounded-2xl w-full"
        src="/images/contact/hero.jpg"
        alt="Contact hero" />
    </div>

    <div class="w-full lg:w-1/2">
      <h1 class="text-5xl font-black">
        We'd love to talk about how we can work together.
      </h1>
      <p class="pt-4 pb-8 text-gray-600">
        Simply dummy text of the printing and typesetting industry. Lorem had
        ceased to been the industry's standard dummy text ever since the 1500s,
        when an unknown printer took a galley.
      </p>
      <div class="flex flex-col gap-4">
        <div
          class="border flex items-center gap-4 p-3 rounded-xl dark:bg-zinc-900">
          <div
            class="bg-[#F4F4F4] dark:bg-zinc-800 w-20 h-20 flex items-center justify-center rounded-2xl">
            <NuxtImg class="w-full p-4" src="/images/icons/mail.svg" />
          </div>
          <div class="flex flex-col">
            <p class="font-bold text-2xl">Message</p>
            <a class="text-gray-600" href="mailto:support@organic.com"
              >support@organic.com</a
            >
          </div>
        </div>
        <div
          class="border flex items-center gap-4 p-3 rounded-xl dark:bg-zinc-900">
          <div
            class="bg-[#F4F4F4] dark:bg-zinc-800 w-20 h-20 flex items-center justify-center rounded-2xl">
            <NuxtImg class="w-full p-4" src="/images/icons/phone.svg" />
          </div>
          <div class="flex flex-col">
            <p class="font-bold text-2xl">Contact Us</p>
            <a class="text-gray-600" href="tel:+01123456789">+01 123 456 789</a>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <a
            class="flex items-center justify-center w-12 h-12 rounded-full bg-[#EFF6F1] dark:bg-zinc-800"
            target="_blank"
            href="https://instagram.com">
            <Icon name="ri:instagram-line" />
          </a>
          <a
            class="flex items-center justify-center w-12 h-12 rounded-full bg-[#EFF6F1] dark:bg-zinc-800"
            target="_blank"
            href="https://facebook.com">
            <Icon name="ri:facebook-circle-fill" />
          </a>
          <a
            class="flex items-center justify-center w-12 h-12 rounded-full bg-[#EFF6F1] dark:bg-zinc-800"
            target="_blank"
            href="https://twitter.com">
            <Icon name="ri:twitter-fill" />
          </a>
          <a
            class="flex items-center justify-center w-12 h-12 rounded-full bg-[#EFF6F1] dark:bg-zinc-800"
            target="_blank"
            href="https://pinterest.com">
            <Icon name="ri:pinterest-fill" />
          </a>
        </div>
      </div>
    </div>
  </section>
  <section
    class="location-section h-[750px] flex flex-col items-center lg:items-end justify-center rounded-2xl my-24">
    <div
      class="flex flex-col bg-white rounded-xl p-10 m-6 lg:mr-20 max-w-none lg:max-w-lg dark:bg-zinc-900">
      <p class="font-yellowtail text-2xl text-[#7EB693]">Location</p>
      <h2 class="font-bold text-2xl lg:text-5xl">Our Farms</h2>
      <p class="pt-2 pb-4">
        Established fact that a reader will be distracted by the readable
        content of a page when looking a layout. The point of using.
      </p>
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-2">
          <Icon
            size="32"
            class="text-[#7EB693]"
            name="mingcute:location-line" />
          <div class="flex flex-col">
            <p class="font-bold">New York, USA:</p>
            <a href="https://maps.app.goo.gl/wKEhNuq76Qsn5qZF9" target="_blank"
              >299 Park Avenue New York, <br />
              New York 10171</a
            >
          </div>
        </div>
        <div class="flex items-center gap-2">
          <Icon
            size="32"
            class="text-[#7EB693]"
            name="mingcute:location-line" />
          <div class="flex flex-col">
            <p class="font-bold">London UK:</p>
            <a href="https://maps.app.goo.gl/qyuLR5o1vWNrTX7z5" target="_blank"
              >30 Stamford Street, <br />
              London SE1 9LQ</a
            >
          </div>
        </div>
      </div>
    </div>
  </section>
  <form @submit.prevent="onSubmit">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <FormField v-slot="{ componentField }" name="fullName">
        <FormItem>
          <FormLabel>Full Name*</FormLabel>
          <FormControl>
            <Input v-bind="componentField" placeholder="Full name" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="email">
        <FormItem>
          <FormLabel>Your Email*</FormLabel>
          <FormControl>
            <Input
              type="email"
              v-bind="componentField"
              placeholder="example@yourmail.com" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="company">
        <FormItem>
          <FormLabel>Company*</FormLabel>
          <FormControl>
            <Input
              v-bind="componentField"
              placeholder="Your company name here" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="subject">
        <FormItem>
          <FormLabel>Subject*</FormLabel>
          <FormControl>
            <Input v-bind="componentField" placeholder="How can we help" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
    </div>
    <FormField v-slot="{ componentField }" name="message">
      <FormItem>
        <FormLabel>Message*</FormLabel>
        <FormControl>
          <Textarea
            v-bind="componentField"
            placeholder="hello there,i would like to talk about how to..." />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" class="mt-4" size="lg">Send Message</Button>
  </form>
</template>

<style>
.location-section {
  background: url("/images/contact/location-section.jpg") no-repeat center/cover;
}
</style>
