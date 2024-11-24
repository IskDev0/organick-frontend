export default defineNuxtRouteMiddleware(async (to, from) => {
  const restrictedRoutes = ["/profile"];

  if (restrictedRoutes.includes(to.path) && !useCookie("accessToken").value) {
    return navigateTo("/");
  }

  if ((to.path === "/auth/login" || to.path === "/auth/register") && useCookie("accessToken").value) {
    return navigateTo("/");
  }

  if (to.path === "/profile" && useCookie("accessToken").value) {
    return navigateTo("/profile/personal");
  }
});
