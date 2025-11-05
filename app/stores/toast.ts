import { defineStore, acceptHMRUpdate } from 'pinia'

interface Toast {
	message: string
	status: 'success' | 'warning' | 'error' | 'default'
	timeout: number
}
interface StateModel {
	list: Toast[]
}

const defaultShowTime = 2_000

export const useToastStore = defineStore('toast', {
	state: (): StateModel => ({
		list: [],
	}),
	getters: {
		toastToShow: (state: StateModel) => state.list.at(0) ?? null,
	},
	actions: {
		showToast(message: string, options?: Partial<Omit<Toast, 'message'>>) {
			this.$state.list.push({
				message,
				status: 'default',
				timeout: defaultShowTime,
				...options,
			})
		},
		removeToast(index: number) {
			this.$state.list.splice(index, 1)
		},
	},
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useToastStore, import.meta.hot))
}
