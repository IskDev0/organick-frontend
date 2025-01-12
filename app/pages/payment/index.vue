<script setup lang="ts">
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Stepper,
  StepperDescription,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/toast";
import { toTypedSchema } from "@vee-validate/zod";
import { Check, Circle, Dot } from "lucide-vue-next";
import { ref } from "vue";
import * as z from "zod";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { useUserAddressStore } from "~/stores/profile/user-address";
import AddAddressModal from "~/components/profile/address/AddAddressModal.vue";

const { $apiClient } = useNuxtApp();

const formSchema = [
  z.object({
    addressId: z.string({ required_error: "Address is required" }),
  }),
  z.object({
    card_number: z
      .string({ required_error: "Card number is required" })
      .min(16, { message: "Invalid card number" }),
    expiration_date: z
      .string({
        required_error: "Expiration date is required",
      })
      .min(4, { message: "Invalid expiration date" }),
    cvc: z
      .string({ required_error: "CVC is required" })
      .min(3, { message: "Invalid CVC" }),
  }),
];

const stepIndex = ref(1);
const steps = [
  {
    step: 1,
    title: "Your Address",
    description: "Provide your address",
  },
  {
    step: 2,
    title: "Payment",
    description: "Enter your payment details",
  },
  {
    step: 3,
    title: "Confirm",
    description: "Confirm your order",
  },
];

async function onSubmit(values: any) {
  try {
    await $apiClient("/orders", {
      method: "POST",
      body: {
        addressId: values.addressId,
        items: cartItems.value.map((item) => {
          return {
            productId: item.id,
            quantity: item.quantity,
            price: parseInt(item.price),
          };
        }),
        payment: {
          amount: parseInt(totalPrice.value),
          paymentMethod: "card",
        },
        totalAmount: parseInt(totalPrice.value),
      },
    });
    cartItems.value = [];
    navigateTo("/payment/success");
  } catch (error) {
    toast({
      title: "Error",
      description: error.data.message,
      variant: "destructive",
    });
  }
}

onMounted(() => {
  getUserAddresses();
});

const { cartItems, totalPrice } = storeToRefs(useCartStore());
const { countTotalItem } = useCartStore();

const { getUserAddresses } = useUserAddressStore();
const { userAddresses } = storeToRefs(useUserAddressStore());

const isAddAddressModalOpen = ref<boolean>(false);
</script>

<template>
  <Form
    v-slot="{ meta, values, validate }"
    as=""
    keep-values
    :validation-schema="toTypedSchema(formSchema[stepIndex - 1])">
    <Stepper
      v-slot="{ isNextDisabled, isPrevDisabled, nextStep, prevStep }"
      v-model="stepIndex"
      class="block w-full">
      <form
        @submit="
          (e) => {
            e.preventDefault();
            validate();

            if (stepIndex === steps.length && meta.valid) {
              onSubmit(values);
            }
          }
        ">
        <div class="flex w-full flex-start gap-2">
          <StepperItem
            v-for="step in steps"
            :key="step.step"
            v-slot="{ state }"
            class="relative flex w-full flex-col items-center justify-center"
            :step="step.step">
            <StepperSeparator
              v-if="step.step !== steps[steps.length - 1].step"
              class="absolute left-[calc(50%+20px)] right-[calc(-50%+10px)] top-5 block h-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary" />

            <StepperTrigger as-child>
              <Button
                :variant="
                  state === 'completed' || state === 'active'
                    ? 'default'
                    : 'outline'
                "
                size="icon"
                class="z-10 rounded-full shrink-0"
                :class="[
                  state === 'active' &&
                    'ring-2 ring-ring ring-offset-2 ring-offset-background',
                ]"
                :disabled="state !== 'completed' && !meta.valid">
                <Check v-if="state === 'completed'" class="size-5" />
                <Circle v-if="state === 'active'" />
                <Dot v-if="state === 'inactive'" />
              </Button>
            </StepperTrigger>

            <div class="mt-5 flex flex-col items-center text-center">
              <StepperTitle
                :class="[state === 'active' && 'text-primary']"
                class="text-sm font-semibold transition lg:text-base">
                {{ step.title }}
              </StepperTitle>
              <StepperDescription
                :class="[state === 'active' && 'text-primary']"
                class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm">
                {{ step.description }}
              </StepperDescription>
            </div>
          </StepperItem>
        </div>

        <div class="flex flex-col gap-4 mt-4">
          <template v-if="stepIndex === 1">
            <div>
              <AddAddressModal
                :is-open="isAddAddressModalOpen"
                @update:open="isAddAddressModalOpen = $event" />
              <FormField
                v-slot="{ componentField }"
                type="radio"
                name="addressId">
                <FormItem class="space-y-3">
                  <FormLabel>Select your address</FormLabel>

                  <FormControl>
                    <RadioGroup
                      class="flex flex-col space-y-2"
                      v-bind="componentField">
                      <FormItem
                        v-for="address in userAddresses"
                        class="flex items-center space-y-0 gap-x-3">
                        <FormControl>
                          <RadioGroupItem :value="address.id" />
                        </FormControl>
                        <FormLabel class="font-normal">
                          <p>{{ address.addressLine1 }}</p>
                          <p v-if="address.addressLine2">
                            {{ address.addressLine2 }}
                          </p>
                          <p>
                            {{ address.country }}, {{ address.state }},
                            {{ address.city }} {{ address.zipCode }}
                          </p>
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
          </template>

          <template v-if="stepIndex === 2">
            <FormField v-slot="{ componentField }" name="card_number">
              <FormItem>
                <FormLabel>Card Number</FormLabel>
                <FormControl>
                  <Input
                    v-maska="'#### #### #### ####'"
                    v-bind="componentField" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                class="flex-1"
                v-slot="{ componentField }"
                name="expiration_date">
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input v-maska="'##/##'" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
              <FormField class="flex-1" v-slot="{ componentField }" name="cvc">
                <FormItem>
                  <FormLabel>CVC</FormLabel>
                  <FormControl>
                    <Input v-maska="'###'" v-bind="componentField" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            </div>
          </template>

          <template v-if="stepIndex === 3">
            <Table class="bg-white dark:bg-zinc-800 border">
              <TableHeader>
                <TableRow>
                  <TableHead> Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead> Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow v-for="cartItem in cartItems">
                  <TableCell>
                    <div class="flex items-center gap-2">
                      <NuxtImg
                        class="h-20 w-20"
                        :src="cartItem.image"
                        :alt="cartItem.name" />
                      <span>{{ cartItem.name }}</span>
                    </div>
                  </TableCell>
                  <TableCell>{{ cartItem.quantity }}</TableCell>
                  <TableCell>${{ cartItem.price }}</TableCell>
                  <TableCell>
                    ${{
                      countTotalItem(cartItem.id, cartItem.quantity).toFixed(2)
                    }}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </template>
        </div>

        <div class="flex items-center justify-between mt-4">
          <Button
            :disabled="isPrevDisabled"
            variant="outline"
            size="sm"
            @click="prevStep()">
            Back
          </Button>
          <div class="flex items-center gap-3">
            <Button
              v-if="stepIndex !== 3"
              :type="meta.valid ? 'button' : 'submit'"
              :disabled="isNextDisabled"
              size="sm"
              @click="meta.valid && nextStep()">
              Next
            </Button>
            <Button v-if="stepIndex === 3" size="sm" type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </Stepper>
  </Form>
</template>