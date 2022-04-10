export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'wordpress-consumer-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/main.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  router: {
    middleware: ['auth'],
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/color-mode-module
    '@nuxtjs/color-mode',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    // https://github.com/nuxt-community/fontawesome-module
    [
      '@nuxtjs/fontawesome',
      {
        component: 'fa',
        suffix: true,
      },
    ],
    // https://github.com/nuxt-community/date-fns-module
    '@nuxtjs/date-fns',
  ],

  tailwindcss: {
    exposeConfig: true,
    viewer: false,
    injectPosition: 0,
  },
  colorMode: {
    classSuffix: '',
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://auth.nuxtjs.org/
    '@nuxtjs/auth-next',
  ],

  auth: {
    strategies: {
      local: {
        token: {
          property: 'token',
          maxAge: 1 * 1000 * 60 * 60 * 24,
        },
        endpoints: {
          login: { url: '/login', method: 'post' },
          // logout: { url: '/logout', method: 'post' },
          user: false,
        },
        user: {
          property: false,
        },
      },
    },
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: process.env.BASE_URL ?? '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  generate: {
    fallback: true
  },
  ssr: false,
  target: 'static',
}
