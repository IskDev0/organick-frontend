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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Stepper,
  StepperDescription,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import { toast } from "@/components/ui/toast";
import { toTypedSchema } from "@vee-validate/zod";
import { Check, Circle, Dot } from "lucide-vue-next";
import { ref } from "vue";
import * as z from "zod";
import { Combobox } from "~/components/ui/combobox";

const { $apiClient } = useNuxtApp();

const formSchema = [
  z.object({
    address_line1: z.string({ required_error: "Address is required" }),
    address_line2: z.string().optional(),
    city: z.string({ required_error: "City is required" }),
    state: z.string({ required_error: "State is required" }),
    postal_code: z.string({ required_error: "Postal code is required" }),
    country: z.string({ required_error: "Country is required" }),
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
        address: {
          address_line1: values.address_line1,
          address_line2: values.address_line2,
          city: values.city,
          state: values.state,
          postal_code: values.postal_code,
          country: values.country,
        },
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
      description: error,
    });
  }
}

const countries = ref<ICountry[]>([]);

const api = useRuntimeConfig().public.cscAPI;

interface ICountry {
  id: number;
  name: string;
  iso2: string;
  iso3: string;
  phonecode: string;
  capital: string;
  currency: string;
  native: string;
  emoji: string;
}

interface IState {
  id: number;
  name: string;
  iso2: string;
}

interface ICity {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
}

const selectedCountry = ref<ICountry>();

const selectedState = ref<IState>();

async function getCountries(): Promise<void> {
  try {
    let response = await fetch("https://api.countrystatecity.in/v1/countries", {
      method: "GET",
      headers: {
        "X-CSCAPI-KEY": api,
      },
      redirect: "follow",
    });
    countries.value = await response.json();
  } catch (error) {
    console.error(error);
  }
}

const states = ref<IState[]>([]);

async function getStates(country: ICountry) {
  try {
    const response = await fetch(
      `https://api.countrystatecity.in/v1/countries/${country.iso2}/states`,
      {
        method: "GET",
        headers: {
          "X-CSCAPI-KEY": api,
        },
        redirect: "follow",
      },
    );
    states.value = await response.json();
    selectedCountry.value = country;
  } catch (error) {
    console.error(error);
  }
}

const cities = ref<ICity[]>([]);

async function getCities(state: IState) {
  try {
    const response = await fetch(
      `https://api.countrystatecity.in/v1/countries/${selectedCountry.value.iso2}/states/${state.iso2}/cities`,
      {
        method: "GET",
        headers: {
          "X-CSCAPI-KEY": api,
        },
        redirect: "follow",
      },
    );
    cities.value = await response.json();
    selectedState.value = state;
  } catch (error) {
    console.error(error);
  }
}

onMounted(() => {
  getCountries();
});

const { cartItems, totalPrice } = storeToRefs(useCartStore());
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
            <FormField v-slot="{ componentField }" name="address_line1">
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input v-bind="componentField" placeholder="Address" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="address_line2">
              <FormItem>
                <FormLabel>Address Line (optional)</FormLabel>
                <FormControl>
                  <Input v-bind="componentField" placeholder="Address" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="country">
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Combobox
                    v-bind="componentField"
                    @select="getStates($event)"
                    :static-items="countries"
                    display-field="name"
                    placeholder="Select a country" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="state">
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Combobox
                    v-bind="componentField"
                    @select="getCities($event)"
                    :static-items="states"
                    display-field="name"
                    placeholder="Select a state" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="city">
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Select v-bind="componentField">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem
                          v-for="city in cities"
                          :key="city.id"
                          :value="city.name"
                          >{{ city.name }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>

            <FormField v-slot="{ componentField }" name="postal_code">
              <FormItem>
                <FormLabel>Postal Code</FormLabel>
                <FormControl>
                  <Input v-bind="componentField" placeholder="Postal Code" />
                </FormControl>
                <FormMessage />
              </FormItem>
            </FormField>
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
            <div v-for="cartItem in cartItems">
              <p>{{ cartItem }}</p>
            </div>
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