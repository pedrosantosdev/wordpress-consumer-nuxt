import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import path from 'path'

export default defineConfig({
	plugins: [vue(), vueJsx(), Components({ dirs: ['./components', './composables'], dts: true })],
	resolve: {
		alias: {
			'@': path.resolve(__dirname),
			'#app': path.resolve(__dirname, './node_modules/nuxt/dist/app/index.d.ts'),
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
