import { useAuthStore } from '@/state/auth'

export default defineNuxtPlugin((nuxt) => {
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
