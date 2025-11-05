<script setup lang="ts">
import { useToastStore } from '@/stores/toast'
import { storeToRefs } from 'pinia'

const toastStore = useToastStore()
const { toastToShow } = storeToRefs(toastStore)
const iconMap = {
	warning: 'Warning icon',
	error: 'Error icon',
	success: 'Check icon',
	default: 'Info icon',
}
const animationTime = 200
const formattedTime = `${animationTime}ms`
const isShowing = ref(false)
const text = ref('')
const icon = ref(iconMap.default)
const closeTimeout = ref<NodeJS.Timeout | null>(null)
watch(toastToShow, () => {
	if (toastToShow.value) {
		text.value = toastToShow.value.message
		icon.value = iconMap[toastToShow.value?.status ?? 'default']
		isShowing.value = true
		closeTimeout.value = setTimeout(() => {
			closeToast()
		}, animationTime + toastToShow.value.timeout)
	}
})
function closeToast(): void {
	if (closeTimeout.value) {
		clearInterval(closeTimeout.value)
		closeTimeout.value = null
	}
	isShowing.value = false
	setTimeout(() => toastStore.removeToast(0), animationTime + 1)
}
</script>
<template>
	<div class="toast" :class="{ active: isShowing }" role="alert">
		<div
			class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200"
		>
			<svg
				aria-hidden="true"
				class="w-5 h-5"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
					clip-rule="evenodd"
				/>
			</svg>
			<span class="sr-only">{{ icon }}</span>
		</div>
		<div class="ml-3 text-sm font-normal" v-text="text" />
		<button
			type="button"
			class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
			aria-label="Close"
			@click.prevent="closeToast"
		>
			<span class="sr-only">Close</span>
			<svg
				aria-hidden="true"
				class="w-5 h-5"
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
	</div>
</template>

<style lang="scss" scoped>
.toast {
	@apply flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 fixed;
	@apply transition-all bottom-3 -right-full;
	transition-duration: v-bind(formattedTime);
	&.active {
		@apply right-8;
	}
}
</style>
