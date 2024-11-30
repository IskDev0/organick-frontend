import type { UserInfo } from "~/types/UserInfo";

export const useUserStore = defineStore("user", () => {
  const { $apiClient } = useNuxtApp();

  const updateUserInfo = async (userForm: UserInfo): Promise<void> => {
    try {
      await $apiClient("/users", {
        method: "PUT",
        credentials: "include",
        body: userForm,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const updateUserPassword = async (newPassword: string): Promise<void> => {
    try {
      await $apiClient("/users/password", {
        method: "patch",
        credentials: "include",
        body: { newPassword },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return {
    updateUserInfo,
    updateUserPassword,
  };
});
