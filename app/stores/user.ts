export const useUserStore = defineStore("user", () => {
  const { $apiClient } = useNuxtApp();

  const updateUserInfo = async (userForm) => {
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

  const updateUserPassword = async () => {
    try {
      await $apiClient("/users/password", {
        method: "PUT",
        credentials: "include",
      });
    } catch (error) {
      console.error(error);
    }
  }

  return {
    updateUserInfo,
  };
});
