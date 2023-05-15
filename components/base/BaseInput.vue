<script setup lang="ts">
import debounce from '@/helpers/debounce'
import { computed, onBeforeMount, onBeforeUnmount } from 'vue'

const emit = defineEmits(['update:modelValue', 'enter', 'debounce'])
const props = defineProps({
	label: {
		type: String,
		default: '',
	},
	readonly: {
		type: Boolean,
		default: false,
	},
	type: {
		type: String,
		default: 'text',
		required: false,
	},
	modelValue: {
		type: [String, Number],
		default: '',
	},
})
const value = computed({
	get() {
		return props.modelValue
	},
	set(value) {
		emit('update:modelValue', value)
	},
})
const keyDownEnter = () => emit('enter', value.value)
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let debounceHandler: ((...args: any[]) => void) | undefined = undefined
onBeforeMount(() => {
	debounceHandler = debounce(() => {
		emit('debounce', value.value)
	})
})
onBeforeUnmount(() => {
	debounceHandler = undefined
})
</script>

<template>
	<label v-if="label">{{ label }}</label>
	<input
		v-model="value"
		class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:outline-none disabled:shadow-outline"
		:readonly="readonly"
		:disabled="readonly"
		:type="type"
		@input="debounceHandler"
		@keydown.enter="keyDownEnter"
	/>
</template>
