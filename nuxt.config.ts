export default defineNuxtConfig({
	srcDir: '.',
	compatibilityDate: '2025-07-01',

	typescript: {
		strict: true,
	},

	ssr: false,
	ignore: ['**/*.test.*', '**/*.spec.*'],

	app: {
		head: {
			title: 'wordpress-consumer-nuxt',
			htmlAttrs: {
				lang: 'en',
			},
			meta: [
				{ charset: 'utf-8' },
				{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
				{ name: 'description', content: '' },
				{ name: 'format-detection', content: 'telephone=no' },
			],
			link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
		},
	},

	devtools: { enabled: false },

	modules: [
		'@pinia/nuxt',
		'@pinia-plugin-persistedstate/nuxt',
		'@nuxtjs/color-mode',
		'@nuxtjs/tailwindcss',
		'nuxt-icons',
		'@vueuse/nuxt',
		'@nuxtjs/device',
		'@vite-pwa/nuxt',
		'@nuxtjs/i18n',
		'@nuxt/eslint',
	],

	piniaPersistedstate: {
		cookieOptions: {
			sameSite: 'strict',
			maxAge: 3 * 24 * 3600,
		},
		storage: 'cookies',
	},

	pwa: {},

	i18n: {
		restructureDir: '.',
		defaultLocale: 'pt-BR',
		detectBrowserLanguage: {
			useCookie: true,
			cookieKey: 'i18n_redirected',
			redirectOn: 'root',
		},
		strategy: 'no_prefix',
		locales: [
			{
				code: 'en',
				file: 'en.json',
			},
			{
				code: 'pt-BR',
				file: 'pt-BR.json',
			},
		],
	},

	runtimeConfig: {
		public: {
			baseUrl: process.env.BASE_URL || 'http://localhost:8080',
		},
	},

	css: ['@/assets/scss/main.scss'],

	tailwindcss: {
		exposeConfig: true,
		viewer: false,
		injectPosition: 0,
	},

	colorMode: {
		preference: 'system',
		fallback: 'dark',
		storageKey: 'nuxt-color-mode',
	},
	spaLoadingTemplate: false,
})
