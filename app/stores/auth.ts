import { FetchError } from "ofetch";
import type { UserInfo } from "~/types/UserInfo";

export const useAuthStore = defineStore("auth", () => {
  const userInfo = ref<UserInfo | null>(null);

  const { $apiClient } = useNuxtApp();

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      userInfo.value = await $apiClient("/auth/login", {
        method: "POST",
        credentials: "include",
        body: {
          email: email,
          password: password,
        },
      });
      navigateTo("/");
      return true;
    } catch (error) {
      return (error as FetchError).data;
    }
  };

  const register = async (user: Record<string, string>): Promise<boolean> => {
    try {
      userInfo.value = await $apiClient("/auth/register", {
        method: "POST",
        credentials: "include",
        body: {
          first_name: user.first_name,
          last_name: user.last_name,
          phone: user.phone,
          email: user.email,
          password: user.password,
        },
      });
      navigateTo("/");
      return true;
    } catch (error) {
      return (error as FetchError).data;
    }
  };

  const getUserInfo = async (): Promise<void> => {
    if (userInfo.value === null) {
      try {
        userInfo.value = await $apiClient("/auth/user", {
          method: "GET",
          credentials: "include",
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const logout = (): void => {
    userInfo.value = null;
    useCookie("accessToken").value = null;
    navigateTo("/");
  };

  return {
    userInfo,
    login,
    register,
    getUserInfo,
    logout,
  };
});
