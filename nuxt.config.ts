export default defineNuxtConfig({
  typescript: {
    shim: false,
    strict: true,
  },
  ssr: false,
  modules: [
    // Doc: https://github.com/nuxt-community/color-mode-module
    '@nuxtjs/color-mode',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://pinia.vuejs.org/ssr/nuxt.html
    '@pinia/nuxt',
    // https://github.com/gitFoxCode/nuxt-icons
    'nuxt-icons',
    // https://vueuse.org/
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    // TODO: Auth
    // TODO: DateFns
    // TODO: Maybe PWA
  ],
  piniaPersistedstate: {
    cookieOptions: {
      sameSite: 'strict',
    },
    storage: 'cookies',
  },
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
    fallback: 'dark', // fallback value if not system preference found
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
  },
  plugins: ['@/plugins/auth-middleware-pinia', '@/plugins/directives'],
})
