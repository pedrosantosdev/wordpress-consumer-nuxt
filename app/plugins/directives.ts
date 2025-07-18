import useHtml from '@/composables/useHtml'

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.directive('safe-html', {
		beforeMount(el, binding, _) {
			useHtml(el, binding)
		},
	})
})
