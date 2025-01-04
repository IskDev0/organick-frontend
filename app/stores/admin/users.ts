import type { IRole, IUsersList, UserInfo } from "~/types/UserInfo";
import type { IPagination } from "~/types/IPagination";

export const useUsersStore = defineStore("users", () => {
  const { $apiClient } = useNuxtApp();

  const users = ref<UserInfo[]>([]);
  const usersPaginationInfo = ref<IPagination>();
  const roles = ref<IRole[]>([]);

  const userFilters = ref({
    search: "",
    roleId: "",
  });

  const getUsers = async (): Promise<void> => {
    const params = new URLSearchParams();
    Object.entries(userFilters.value).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });

    try {
      const { data, pagination } = await $apiClient<IUsersList>(
        "/users?" + params.toString(),
      );
      users.value = data;
      usersPaginationInfo.value = pagination;
    } catch (error) {
      console.error(error);
    }
  };

  const updateUserRole = async (id: string, roleId: number): Promise<void> => {
    try {
      await $apiClient(`/users/${id}`, {
        method: "PATCH",
        body: {
          roleId,
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (id: string): Promise<void> => {
    try {
      await $apiClient(`/users/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const getRoles = async ():Promise<void> => {
    try {
      roles.value = await $apiClient("/users/roles");
    } catch (error) {
      console.error(error);
    }
  };

  return {
    users,
    roles,
    usersPaginationInfo,
    userFilters,
    getUsers,
    updateUserRole,
    deleteUser,
    getRoles,
  };
});
