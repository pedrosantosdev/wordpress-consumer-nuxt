<template>
	<div
		class="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in"
	>
		<input
			:id="keyId"
			v-model="currentState"
			class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
			type="checkbox"
			name="toggle"
			@change="emit('toggle', currentState)"
		>
		<label
			:for="keyId"
			class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps({
	id: {
		type: String,
		required: true,
	},
	defaultState: {
		type: Boolean,
		required: false,
		default: false,
	},
})
const emit = defineEmits(['toggle'])

const currentState = ref(props.defaultState)
const keyId = computed(() => `${props.id}-input-toggle`)
</script>
<style lang="scss">
.toggle-checkbox:checked {
	@apply right-0 border-green-400;
	& + .toggle-label {
		@apply bg-green-400;
	}
}
</style>
