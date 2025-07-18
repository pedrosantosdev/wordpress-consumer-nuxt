import { defineVitestConfig } from '@nuxt/test-utils/config'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import path from 'path'

export default defineVitestConfig({
	// plugins: [vue(), vueJsx(), Components({ dirs: ['./app/components', './app/composables'], dts: true })],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'app'),
			'~': path.resolve(__dirname, 'app'),
			// '#app': path.resolve(__dirname, './node_modules/nuxt/dist/app/index.d.ts'),
		},
	},
	test: {
		environment: 'nuxt',
		coverage: {
			reporter: ['lcov', 'json', 'html'],
			exclude: ['app/assets', 'test', '**/.nuxt', '**/node_modules/**', '**/dist/**'],
		},
	},
})
