import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
	plugins: [Vue()],
	resolve: {
		alias: {
			// eslint-disable-next-line no-undef
			'@': path.resolve(__dirname),
		},
	},
	test: {
		environment: 'happy-dom',
	},
})
