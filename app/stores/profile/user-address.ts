import type { IAddress } from "~/types/profile/IAddress";

export const useUserAddressStore = defineStore("user-address", () => {
  const { $apiClient } = useNuxtApp();

  const userAddresses = ref<IAddress[]>([]);

  const getUserAddresses = async (): Promise<void> => {
    try {
      userAddresses.value = await $apiClient("/users/address");
    } catch (error) {
      console.error(error);
    }
  };

  const addUserAddress = async (
    postData: IAddress,
  ): Promise<
    | boolean
    | {
        error: any;
        status: boolean;
      }
  > => {
    try {
      const response = await $apiClient("/users/address", {
        method: "POST",
        body: postData,
      });

      if (response) {
        return true;
      }
    } catch (error) {
      console.error(error);
      return {
        error,
        status: false,
      };
    }

    return false;
  };

  const updateUserAddress = async (
    id: number,
    putData: IAddress,
  ): Promise<
    | boolean
    | {
        error: any;
        status: boolean;
      }
  > => {
    try {
      const response = await $apiClient(`/users/address/${id}`, {
        method: "PUT",
        body: putData,
      });
      if (response) {
        return true;
      }
    } catch (error) {
      console.error(error);
      return {
        error,
        status: false,
      };
    }

    return false;
  };

  const deleteUserAddress = async (
    id: number,
  ): Promise<boolean | { error: any; status: boolean }> => {
    try {
      const response = await $apiClient(`/users/address/${id}`, {
        method: "DELETE",
      });
      if (response) {
        return true;
      }
    } catch (error) {
      console.error(error);
      return {
        error,
        status: false,
      };
    }

    return false;
  };

  return {
    userAddresses,
    getUserAddresses,
    addUserAddress,
    updateUserAddress,
    deleteUserAddress,
  };
});
