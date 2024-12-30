<script setup lang="ts">
import { Textarea } from "~/components/ui/textarea";
import {Input} from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import ImageUploader from "~/components/admin/ImageUploader.vue";
import { useToast } from "~/components/ui/toast";
import Spinner from "~/components/common/Spinner.vue";

definePageMeta({
  layout: "admin"
})

const {$apiClient} = useNuxtApp()
const {toast} = useToast()

const categories = ref<{id: number, name: string}[]>([])
const isLoading = ref<boolean>(false)

async function getCategories(){
  try {
    const data = await $apiClient<{id: number, name: string}[]>("/products/categories")
    categories.value = data
  } catch (error) {
    console.error(error)
  }
}

const {newProduct} = storeToRefs(useProductsStore())
const {addProduct} = useProductsStore()

onMounted(() => getCategories())

async function handleProductAdd(){
  try {
    isLoading.value = true
    await addProduct()
    newProduct.value = {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      image: "",
      category: 0
    }
    isLoading.value = false
    navigateTo("/admin/products")
  } catch (error) {
    console.error(error)
    toast({
      title: "Error",
      description: `Something went wrong: ${error}`,
      variant: "destructive"
    })
  }
}
</script>

<template>
<section class="flex gap-8">
  <div class="w-2/3">
    <div class="flex flex-col gap-4">
      <div class="bg-white dark:bg-zinc-800 p-8 rounded-2xl">
        <h1 class="text-3xl font-bold mb-4">General Information</h1>
        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-2">
            <Label>Product Name</Label>
            <Input v-model="newProduct.name" placeholder="Product Name"/>
          </div>
          <div class="flex flex-col gap-2">
            <Label>Description</Label>
            <Textarea v-model="newProduct.description" placeholder="Description"/>
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <div class="bg-white dark:bg-zinc-800 p-8 rounded-2xl">
          <h1 class="text-3xl font-bold mb-4">Inventory</h1>
          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-2">
              <Label>Price</Label>
              <Input v-model="newProduct.price" type="number" placeholder="Price"/>
            </div>
            <div class="flex flex-col gap-2">
              <Label>Stock</Label>
              <Input v-model="newProduct.stock" type="number" placeholder="Stock"/>
            </div>
            <div class="flex flex-col gap-2">
              <Label>Category</Label>
              <Select v-model="newProduct.categoryId">
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem v-for="category in categories" :key="category.id" :value="category.id">
                      {{category.name}}
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="w-1/3 flex flex-col gap-4">
    <div class="bg-white dark:bg-zinc-800 p-8 rounded-2xl">
      <div class="flex flex-col gap-2">
        <Label class="text-3xl font-bold mb-4">Image</Label>
        <ImageUploader @update:image="newProduct.image = $event" accept="image/png"/>
      </div>
    </div>
    <div class="bg-white dark:bg-zinc-800 p-8 rounded-2xl">
      <div class="flex flex-col gap-2">
        <Label class="text-3xl font-bold mb-4">Add Product</Label>
        <Button @click="handleProductAdd">Add</Button>
      </div>
    </div>
  </div>
</section>
  <Spinner v-if="isLoading"/>
</template>