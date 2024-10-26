import { ofetch } from "ofetch";
import { useCookie, useRuntimeConfig } from "#imports";

async function refreshToken() {
  const config = useRuntimeConfig();
  try {
    await ofetch("/auth/refresh", {
      baseURL: config.public.baseURL,
      method: "POST",
      credentials: "include",
    });
    return true;
  } catch (error) {
    console.error("Error refreshing token:", error);
    return false;
  }
}

export default function createApiClient() {
  const config = useRuntimeConfig();

  const apiClient = ofetch.create({
    baseURL: config.public.baseURL,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    onRequest({ options }) {
      const accessToken = useCookie("accessToken").value;
      if (accessToken) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`,
        };
      }
    },
    async onResponseError({ request, response, options }) {

      if (response.status === 401) {
        const tokenRefreshed = await refreshToken();

        if (tokenRefreshed) {
          return apiClient(request, options);
        }
      } else if (response.status === 500) {
        console.error("Server error - please try again later");
      }

      return response._data;
    },
  });

  return {
    provide: {
      apiClient,
    },
  };
}
