import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'

export default defineConfig({
	plugins: [vue(), vueJsx()],
	resolve: {
		alias: {
			// eslint-disable-next-line no-undef
			'@': path.resolve(__dirname),
		},
	},
	test: {
		environment: 'happy-dom',
		globals: true,
		setupFiles: ['test/mock/FakeRouter', 'test/mock/FakeNuxt'],
		coverage: {
			reporter: ['lcov', 'json', 'html'],
			exclude: ['assets', 'test'],
		},
	},
})
