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
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "~/components/ui/button";
import { useCartStore } from "~/stores/cart";
import StarRating from "~/components/products/StarRating.vue";
import { Textarea } from "~/components/ui/textarea";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import { useToast } from "~/components/ui/toast";
import ReviewsList from "~/components/products/ReviewsList.vue";
import { useReviewsStore } from "~/stores/reviews";

const { $apiClient } = useNuxtApp();

const { getProduct } = useProductsStore();
const { addToCart } = useCartStore();
const { isProductInCart } = storeToRefs(useCartStore());
const { getReviews, postReview } = useReviewsStore();
const { reviews } = storeToRefs(useReviewsStore());

const id = String(useRoute().params.id)

const { toast } = useToast();

const productInfo = ref<IProductFull | null>(null);

onMounted(async () => {
  productInfo.value = await getProduct(id);
  productInfo.value!.quantity = 1;
  await getRelatedProducts();
  await getReviews(id);
});

const relatedProducts = ref<IProduct[]>([]);

async function getRelatedProducts() {
  const { data } = await $apiClient<IProductWithPagination>(
    `/products/search?category_id=${productInfo.value?.category_id}&limit=4`,
  );
  relatedProducts.value = data;
}

const reviewSchema = toTypedSchema(
  z.object({
    rating: z.number().min(1).max(5),
    comment: z
      .string()
      .min(5, { message: "Message must be at least 5 characters" })
      .max(500),
  }),
);

const { handleSubmit, handleReset } = useForm({
  validationSchema: reviewSchema,
});

const onSubmit = handleSubmit(async (values) => {
  try {
    await postReview({ ...values, productId: id })
    toast({
      title: "Success",
      description: "Review added successfully"
    })
    await getReviews(id)
    handleReset()
  }catch (error){
    toast({
      title: "Error",
      description: error.data.message,
      variant: "destructive",
    })
  }

});
</script>

<template>
  <section v-if="productInfo" class="flex items-center">
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
          v-if="productInfo.oldPrice"
          class="text-gray-400 line-through font-semibold"
          >${{ productInfo.oldPrice }}</span
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
  </section>
  <section class="mt-20">
    <h2 class="font-bold text-3xl text-center mb-8">Reviews</h2>
    <div v-if="reviews?.length > 0">
      <ReviewsList :reviews="reviews" />
    </div>
    <div v-else class="text-center text-2xl">No reviews yet</div>
    <form
      class="flex flex-col gap-4 mt-10 border p-4 rounded-xl bg-gray-100 dark:bg-zinc-900"
      @submit="onSubmit">
      <FormField v-slot="{ componentField }" name="rating">
        <FormItem>
          <FormLabel>Rating</FormLabel>
          <FormControl>
            <StarRating v-bind="componentField" :max-stars="5" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="comment">
        <FormItem>
          <FormLabel>Message</FormLabel>
          <FormControl>
            <Textarea v-bind="componentField" />
          </FormControl>
          <FormMessage />
        </FormItem>
      </FormField>
      <Button type="submit">Submit</Button>
    </form>
  </section>
  <section>
    <h3 class="font-bold text-3xl text-center mb-8 mt-20">Related Products</h3>
    <ProductsList
      v-if="relatedProducts.length > 0"
      :products="relatedProducts" />
  </section>
</template>
