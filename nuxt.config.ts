export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  modules: [
    "@nuxt/image",
    "@nuxt/icon",
    "@nuxtjs/google-fonts",
    "nuxt-swiper",
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@formkit/auto-animate/nuxt",
  ],
  googleFonts: {
    families: {
      Roboto: true,
      "Open+Sans": [400, 600, 700],
      Yellowtail: true,
    },
  },
  shadcn: {
    componentDir: "./components/ui",
  },
  devServer: {
    port: 5050,
  },
  colorMode: {
    classSuffix: "",
    preference: "light",
    fallback: "light",
  },
  runtimeConfig: {
    public: {
      baseURL: process.env.NUXT_BASE_URL,
      cscAPI: process.env.NUXT_CSCAPI_KEY,
    },
  },
  routeRules: {
    "/news/*": { static: true },
    "/admin/*": { ssr: false },
  },
  router: {
    options: {
      linkActiveClass: "active",
      linkExactActiveClass: "active",
    },
  },
  build: {
    transpile: ["@vuepic/vue-datepicker"],
  },
  ssr: false,
});
