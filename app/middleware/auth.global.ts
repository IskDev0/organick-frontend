export default defineNuxtRouteMiddleware(async (to, from) => {

  const { getUserInfo } = useAuthStore();

  if ((to.path !== "/auth/login" && to.path !== "/auth/register") && useCookie("accessToken").value) {
    await getUserInfo();
  }
})