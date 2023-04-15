import { useAuthStore } from '@/state/auth'
import { defineNuxtRouteMiddleware } from 'nuxt/app'

export default defineNuxtRouteMiddleware(async (to, from) => {
	const authStore = useAuthStore()
	if (to.name !== 'login' && !authStore.isAuth) {
		authStore.lastPage = to.path ?? '/'
		return navigateTo('login')
	}
})
