import { useAuthStore } from '@/state/auth'
import { defineNuxtPlugin, useCookie, addRouteMiddleware, navigateTo } from 'nuxt/app'
import { createNuxtPersistedState } from 'pinia-plugin-persistedstate/nuxt'

export default defineNuxtPlugin((nuxt) => {
	nuxt.$pinia.use(createNuxtPersistedState(useCookie))
	const authStore = useAuthStore(nuxt.$pinia)

	addRouteMiddleware(
		'auth-middleware-pinia',
		async ({ name, path }) => {
			if (name !== 'login' && (!authStore.isAuth || authStore.isExpired)) {
				authStore.lastPage = path
				return navigateTo('/login')
			}
		},
		{ global: true }
	)
})
