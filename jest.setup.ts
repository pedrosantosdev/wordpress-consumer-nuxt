/* eslint-disable vue/one-component-per-file */
import { config } from '@vue/test-utils'
import { defineComponent } from 'vue'

const ClientOnly = defineComponent({
	name: 'ClientOnly',
	template: '<template><slot /></template>',
})

const NuxtLayout = defineComponent({
	name: 'NuxtLayout',
	template: '<template><slot /></template>',
})

config.global.stubs = { ClientOnly, NuxtLayout }

const originalWarn = window.console.warn
window.console.warn = (e) => {
	return e.includes('If this is a native custom element') ? '' : originalWarn(e)
}
