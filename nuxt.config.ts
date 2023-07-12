export default defineNuxtConfig({
  runtimeConfig: {
    openAi: {
      secretKey: "",
    },
  },

  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
