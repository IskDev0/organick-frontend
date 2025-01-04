import type { IRole, UserInfo } from "~/types/UserInfo";

export const useUsersStore = defineStore('users', () => {

  const {$apiClient} = useNuxtApp()

  const users = ref<UserInfo[]>([])
  const roles = ref<IRole[]>([])

  const getUsers = async ():Promise<void> => {
    try {
      users.value = await $apiClient<UserInfo[]>('/users')
    }catch (error){
      console.error(error)
    }
  }

  const updateUserRole = async (id: string, roleId: number):Promise<void> => {
    try {
      await $apiClient(`/users/${id}`, {
        method: 'PATCH',
        body: {
          roleId
        }
      })
    }catch (error){
      console.error(error)
    }
  }

  const deleteUser = async (id: string):Promise<void> => {
    try {
      await $apiClient(`/users/${id}`, {
        method: 'DELETE'
      })
    }catch (error){
      console.error(error)
    }
  }

  const getRoles = async () => {
    try {
      roles.value = await $apiClient('/users/roles')
    } catch (error) {
      console.error(error)
    }
  }

  return {
    users,
    roles,
    getUsers,
    updateUserRole,
    deleteUser,
    getRoles
  }

})