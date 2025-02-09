export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const { getUserInfo } = authStore;
  const { userInfo } = storeToRefs(authStore);
  const accessToken = useCookie("accessToken").value;

  const restrictedRoutes = new Set([
    "/profile",
    "/profile/personal",
    "/profile/settings",
    "/profile/orders",
  ]);

  if (accessToken && !to.path.startsWith("/auth")) {
    await getUserInfo();
  }

  if (!accessToken && restrictedRoutes.has(to.path) && to.path !== "/auth/login") {
    return navigateTo("/auth/login");
  }

  if (to.path === "/profile" && accessToken) {
    return navigateTo("/profile/personal");
  }

  if (to.path.startsWith("/admin") && userInfo.value?.role !== "admin") {
    return navigateTo("/");
  }
});
