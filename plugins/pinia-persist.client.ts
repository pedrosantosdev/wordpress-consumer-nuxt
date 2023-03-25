import { type Pinia } from 'pinia'
import { createPersistedState, persistedState } from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin((nuxtApp) => {
	const pinia = nuxtApp.$pinia as Pinia

	pinia.use(
		createPersistedState({
			storage: persistedState.cookiesWithOptions({}),
		})
	)
})
