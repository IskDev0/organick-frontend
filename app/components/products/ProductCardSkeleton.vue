<script setup lang="ts">
import { Separator } from "~/components/ui/separator";
import { Skeleton } from "~/components/ui/skeleton";
</script>

<template>
  <article class="bg-gray-200 px-6 pt-6 pb-4 rounded-xl aspect-square dark:bg-zinc-900">
    <Skeleton class="rounded-lg h-[20px] w-[50px]"/>
    <Skeleton class="max-w-[300px] max-h-[300px] mt-3 mb-2 aspect-square"/>
    <Skeleton class="w-[calc(100%-50px)] h-[20px]"/>
    <Separator class="my-2"/>
    <div class="flex items-center justify-between">
      <Skeleton class="w-[100px] h-[20px]"/>
      <Skeleton class="w-[100px] h-[20px]"/>
    </div>
  </article>
</template>