export default defineNuxtConfig({
	typescript: {
		shim: false,
		strict: true,
	},
	ssr: false,
	ignore: ['jest.config.js', '**/*.test.*', '**/*.spec.*'],
	head: {
		title: 'wordpress-consumer-nuxt',
		htmlAttrs: {
			lang: 'en',
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},
	modules: [
		// Doc: https://github.com/nuxt-community/color-mode-module
		'@nuxtjs/color-mode',
		// https://go.nuxtjs.dev/tailwindcss
		'@nuxtjs/tailwindcss',
		// https://pinia.vuejs.org/ssr/nuxt.html
		'@pinia/nuxt',
		'@pinia-plugin-persistedstate/nuxt',
		// https://github.com/gitFoxCode/nuxt-icons
		'nuxt-icons',
		// https://vueuse.org/
		'@vueuse/nuxt',
		// https://nuxt.com/modules/device
		'@nuxtjs/device',
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
		fallback: 'dark', // fallback value if not system preference found
		classPrefix: '',
		classSuffix: '',
		storageKey: 'nuxt-color-mode',
	},
	plugins: ['@/plugins/auth-middleware-pinia'],
	device: {
		refreshOnResize: true,
	},
})
