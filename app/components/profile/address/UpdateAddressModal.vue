<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Button } from "~/components/ui/button";
import { Combobox } from "~/components/ui/combobox";
import { useUserAddressStore } from "~/stores/profile/user-address";
import { useToast } from "~/components/ui/toast";

const { $apiClient } = useNuxtApp();

const { toast } = useToast();

const { getUserAddresses } = useUserAddressStore();

interface Props {
  isOpen: boolean;
  updateAddress: any;
}

const props = withDefaults(defineProps<Props>(), {
  isOpen: false,
});

const emit = defineEmits<{
  (e: "update:open", payload: boolean): void;
}>();

const toggleOpen = () => {
  emit("update:open", !props.isOpen);
};

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
    selectedCountry.value = countries.value.find(
      (i) => i.name === props.updateAddress.country,
    );
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
    selectedState.value = states.value.find(
      (i) => i.name === props.updateAddress.state,
    );
  } catch (error) {
    console.error(error);
  }
}

const cities = ref<ICity[]>([]);

async function getCities(state: IState) {
  try {
    const response = await fetch(
      `https://api.countrystatecity.in/v1/countries/${selectedCountry.value!.iso2}/states/${selectedState.value.iso2}/cities`,
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

async function onSubmit(values: any) {
  try {
    await $apiClient(`/users/address/${props.updateAddress.id}`, {
      method: "PUT",
      body: {
        address_line1: values.address_line1,
        address_line2: values.address_line2,
        city: values.city,
        state: values.state,
        postal_code: values.postal_code,
        country: values.country,
      },
    });
    toast({
      title: "Success",
      description: "Address added successfully",
    });
    await getUserAddresses();
    toggleOpen();
  } catch (error) {
    toast({
      title: "Error",
      description: error,
    });
  }
}

const formSchema = toTypedSchema(
  z.object({
    address_line1: z.string({ required_error: "Address is required" }),
    address_line2: z.string().nullable().optional(),
    city: z.string({ required_error: "City is required" }),
    state: z.string({ required_error: "State is required" }),
    postal_code: z.string({ required_error: "Postal code is required" }),
    country: z.string({ required_error: "Country is required" }),
  }),
);

function setupUpdateData() {
  console.log("selectedCountry: ", selectedCountry.value);
  console.log("selectedState: ", selectedState.value);
}

onMounted(async () => {
  await getCountries();
  await getStates(selectedCountry.value!);
  await getCities(selectedState.value!);
});
</script>

<template>
  <Form v-slot="{ handleSubmit }" :validation-schema="formSchema">
    <Dialog :open="isOpen" @update:open="toggleOpen">
      <DialogTrigger>
        <Button variant="ghost">
          <Icon size="20" name="mingcute:edit-2-line" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Address</DialogTitle>
        </DialogHeader>
        <form id="dialogForm" @submit="handleSubmit($event, onSubmit)">
          <FormField
            :model-value="updateAddress.address_line1"
            v-slot="{ componentField }"
            name="address_line1">
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input v-bind="componentField" placeholder="Address" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField
            :model-value="updateAddress.address_line2"
            v-slot="{ componentField }"
            name="address_line2">
            <FormItem>
              <FormLabel>Address Line (optional)</FormLabel>
              <FormControl>
                <Input v-bind="componentField" placeholder="Address" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField
            :model-value="updateAddress.country"
            v-slot="{ componentField }"
            name="country">
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

          <FormField
            :model-value="updateAddress.state"
            v-slot="{ componentField }"
            name="state">
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

          <FormField
            :model-value="updateAddress.city"
            v-slot="{ componentField }"
            name="city">
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

          <!--          TODO: fix this fucking piece of js-->
          <FormField v-slot="{ componentField }" name="postal_code">
            <FormItem>
              <FormLabel>Postal Code</FormLabel>
              <FormControl>
                <Input
                  v-bind="componentField"
                  :model-value="updateAddress.postal_code"
                  placeholder="Postal Code" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </form>
        <DialogFooter>
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="dialogForm">Update</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </Form>
</template>