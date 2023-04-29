import { createRouter, createMemoryHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Dummy from '@/pages/index.vue'

const allRoutes = [
	{
		path: '/',
		component: Dummy,
	},
] as RouteRecordRaw[]

export default createRouter({
	history: createMemoryHistory(),
	routes: allRoutes,
})
