import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

// PWA Config
const title = "Mini-GitHub-Manager";
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
      htmlAttrs: { lang: "bg" },
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

        // Open Graph
        { property: "og:site_name", content: title },
        { hid: "og:type", property: "og:type", content: "website" },
        { hid: "og:url", property: "og:url", content: url },
        { hid: "og:title", property: "og:title", content: title },
        { hid: "og:description", property: "og:description", content: description },
        { hid: "og:image", property: "og:image", content: image },
        { hid: "og:image:secure_url", property: "og:image:secure_url", content: image },

        // Twitter
        { name: "twitter:card", content: "summary_large_image" },
        { hid: "twitter:url", name: "twitter:url", content: url },
        { hid: "twitter:title", name: "twitter:title", content: title },
        { hid: "twitter:description", name: "twitter:description", content: description },
        { hid: "twitter:image", name: "twitter:image", content: image },
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
      lang: "bg",
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

  // Cloudflare Pages
  nitro: {
    preset: "cloudflare-pages",
  },
});
