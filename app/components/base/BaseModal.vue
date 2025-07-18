<script lang="ts" setup>
import { ref, watch } from 'vue'
import useLockScroll from '@/composables/useLockScroll'

const props = defineProps({
	showModal: {
		type: Boolean,
		default: false,
	},
})
const emit = defineEmits(['close'])

const modal = ref(null)
const isOpen = ref(props.showModal)
useLockScroll(props.showModal)
const closeModal = () => {
	useLockScroll(false)
	emit('close', isOpen.value)
}
watch(
	() => props.showModal,
	(showModal) => {
		isOpen.value = showModal
		useLockScroll(showModal)
	},
)
</script>

<template>
	<teleport to="body">
		<transition
			enter-active-class="transition ease-out duration-200 transform"
			enter-from-class="opacity-0"
			enter-to-class="opacity-100"
			leave-active-class="transition ease-in duration-200 transform"
			leave-from-class="opacity-100"
			leave-to-class="opacity-0"
		>
			<div
				v-show="isOpen"
				ref="modal-backdrop"
				class="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50"
			>
				<div class="flex items-start justify-center min-h-screen pt-24 text-center">
					<transition
						enter-active-class="transition ease-out duration-300 transform "
						enter-from-class="opacity-0 translate-y-10 scale-95"
						enter-to-class="opacity-100 translate-y-0 scale-100"
						leave-active-class="ease-in duration-200"
						leave-from-class="opacity-100 translate-y-0 scale-100"
						leave-to-class="opacity-0 translate-y-10 translate-y-0 scale-95"
					>
						<div
							v-show="isOpen"
							ref="modal"
							role="dialog"
							aria-modal="true"
							aria-labelledby="modal-headline"
							class="bg-white dark:bg-gray-800 dark:text-white rounded-lg text-left shadow-xl p-8 w-11/12 max-w-6xl relative"
						>
							<button
								class="absolute top-3 right-3 md:-top-4 md:-right-4 text-lg md:text-white dark:text-white"
							>
								<NuxtIcon name="times" @click="closeModal" />
							</button>
							<slot>I'm empty inside</slot>
						</div>
					</transition>
				</div>
			</div>
		</transition>
	</teleport>
</template>
