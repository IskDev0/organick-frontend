<script setup lang="ts">
import type {
  IProduct,
  IProductFull,
  IProductWithPagination,
} from "~/types/IProduct";
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/components/ui/number-field";
import { Button } from "~/components/ui/button";
import { useCartStore } from "~/stores/cart";

const { $apiClient } = useNuxtApp();

const { getProduct } = useProductsStore();
const { addToCart } = useCartStore();
const { isProductInCart } = storeToRefs(useCartStore());

const { id } = useRoute().params;

const productInfo = ref<IProductFull | null>(null);

onMounted(async () => {
  productInfo.value = await getProduct(parseInt(id as string));
  productInfo.value.quantity = 1;
  await getRelatedProducts();
});

const relatedProducts = ref<IProduct[]>([]);

async function getRelatedProducts() {
  const { data } = await $apiClient<IProductWithPagination>(
    `/products/search?category_id=${productInfo.value?.category_id}&limit=4`,
  );
  relatedProducts.value = data;
}

</script>

<template>
  <div v-if="productInfo" class="flex items-center">
    <div class="flex justify-center flex-1">
      <NuxtImg
        class="w-2/3 bg-gray-100 rounded-xl dark:bg-zinc-700"
        :src="productInfo?.image"
        :alt="productInfo.name" />
    </div>
    <div class="flex flex-col gap-2 flex-1">
      <p class="text-3xl font-bold">{{ productInfo.name }}</p>
      <div class="flex">
        <Icon
          size="20"
          v-for="i in 5"
          :key="i"
          :class="
            i <= parseInt(productInfo.rating)
              ? 'text-[#FFA858]'
              : 'text-gray-400'
          "
          name="mynaui:star-solid" />
      </div>
      <div class="flex items-center gap-2">
        <span
          v-if="productInfo.old_price"
          class="text-gray-400 line-through font-semibold"
          >${{ productInfo.old_price }}</span
        >
        <span class="font-bold">${{ productInfo.price }}</span>
      </div>
      <p class="py-2">{{ productInfo.description }}</p>
      <div class="flex items-center gap-8">
        <NumberField
          :disabled="isProductInCart(productInfo.id)"
          v-model="productInfo.quantity"
          id="quantity"
          :default-value="1"
          :min="1"
          :max="productInfo.stock">
          <NumberFieldContent>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldContent>
        </NumberField>
        <Button
          :disabled="isProductInCart(productInfo.id)"
          @click="addToCart(productInfo, productInfo.quantity as number)"
          >Add To Cart
        </Button>
      </div>
    </div>
  </div>
  <div>
    <h2 class="font-bold text-3xl text-center mb-8 mt-20">Related Products</h2>
    <ProductsList v-if="relatedProducts.length > 0" :products="relatedProducts" />
  </div>
</template>
