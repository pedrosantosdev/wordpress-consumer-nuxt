import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false,
    strict: true,
  },
  modules: [
    // Doc: https://github.com/nuxt-community/color-mode-module
    '@nuxtjs/color-mode',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://pinia.vuejs.org/ssr/nuxt.html
    '@pinia/nuxt',
    // https://github.com/cipami/nuxt-lodash#readme
    'nuxt-lodash',
    // https://github.com/gitFoxCode/nuxt-icons
    'nuxt-icons',
    // TODO: Auth
    // TODO: DateFns
    // TODO: Maybe PWA
  ],
  // https://v3.nuxtjs.org/guide/features/runtime-config
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || '',
    },
  },
  storybook: {
    // Options
  },
  pwa: {
    manifest: {
      lang: 'en',
    },
  },
  css: ['@/assets/scss/main.scss'],
  tailwindcss: {
    exposeConfig: true,
    viewer: false,
    injectPosition: 0,
  },
  colorMode: {
    preference: 'system', // default value of $colorMode.preference
    fallback: 'light', // fallback value if not system preference found
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '-mode',
    storageKey: 'nuxt-color-mode',
  },
  plugins: ['@/plugins/pinia-plugin-persist.client'],
})
