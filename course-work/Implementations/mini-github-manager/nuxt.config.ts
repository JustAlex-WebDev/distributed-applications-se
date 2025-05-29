import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// PWA Config
const title = "Mini GitHub Manager";
const shortTitle = "MGH-Manager";
const description =
  "Mini-GitHub-Manager е Nuxt 3 приложение за CRUD управление на потребители, хранилища и комити, с JWT-защитен API и Swagger документация.";
const image = "https://your-domain.com/og-image.png";
const url = "https://your-domain.com/mini-github-manager";
const author = "фак.номер 2301321008";
const themeColor = "#1c5a6c";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // import styles
  css: ["@/assets/main.scss"],

  devtools: { enabled: true },

  // enable takeover mode
  typescript: { shim: false },

  build: { transpile: ["vuetify"] },

  // Based on docs found here - https://vuetifyjs.com/en/getting-started/installation/#using-nuxt-3
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },

  modules: [
    "@vite-pwa/nuxt",
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        config.plugins ||= [];
        config.plugins.push(vuetify());
      });
    },
  ],

  app: {
    head: {
      title,
      titleTemplate: "%s",
      htmlAttrs: { lang: "en" },
      link: [
        { rel: "stylesheet", href: "https://rsms.me/inter/inter.css" },
        { rel: "preconnect", href: "https://rsms.me/" },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "canonical", href: url },
      ],
      meta: [
        // basic
        { hid: "description", name: "description", content: description },
        { name: "author", content: author },
        { name: "theme-color", content: themeColor },
      ],
    },
  },

  pwa: {
    includeAssets: ["favicon.ico", "robots.txt"],
    manifest: {
      name: shortTitle,
      short_name: shortTitle,
      description: description,
      theme_color: themeColor,
      lang: "en",
      background_color: "#ffffff",
      icons: [
        {
          src: "/icons/pwa-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/icons/pwa-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/icons/pwa-maskable-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "maskable",
        },
        {
          src: "/icons/pwa-maskable-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
        },
      ],
    },
  },

  // Runtime configuration for API and static resources
  runtimeConfig: {
    public: {
      PORTAL_FE_KC_URL: process.env.NUXT_PUBLIC_PORTAL_FE_KC_URL || "",
      PORTAL_FE_KC_REALM: process.env.NUXT_PUBLIC_PORTAL_FE_KC_REALM || "",
      PORTAL_FE_KC_CLIENT_ID: process.env.NUXT_PUBLIC_PORTAL_FE_KC_CLIENT_ID || "",
    },
  },

  // Cloudflare Pages
  nitro: {
    preset: "cloudflare-pages",
  },
});
