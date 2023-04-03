import { useAuthStore } from '@/state/auth'
import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'

export default defineNuxtRouteMiddleware((to, from) => {
	const authStore = useAuthStore()
	if (to.name !== 'login' && (!authStore.isAuth || authStore.isExpired)) {
		authStore.lastPage = to.path
		return navigateTo('/login')
	}
})
