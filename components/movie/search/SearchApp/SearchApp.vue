<template>
	<div>
		<BaseInput v-model="value" @debounce="debounce(() => emitValue())" @enter="emitValue()" />
		<NuxtIcon
			class="absolute top-0 right-0 cursor-pointer mt-1 mx-3 text-black filter-icon"
			:class="{ active: optionsActive }"
			name="gears"
			@click.prevent="optionsActive = !optionsActive"
		/>
		<NuxtIcon
			class="absolute top-0 right-10 cursor-pointer text-black py-3 px-4"
			name="times"
			@click.prevent="clearQuery"
		/>
	</div>
	<div class="filter-container" :class="{ active: optionsActive }">
		<MovieSearchFilterButton
			v-for="(objValue, key) in filters"
			:key="key"
			v-model="objValue.value"
			:label="objValue.label"
		/>
	</div>
</template>

<script setup lang="ts">
import debounce from '@/helpers/debounce'
const props = defineProps({
	input: {
		type: String,
		default: '',
		required: false,
	},
})
const emit = defineEmits(['update:input'])

const initStateFilters = {
	isLocal: {
		label: 'Local',
		value: false,
	},
	isActive: {
		label: 'Ativo',
		value: false,
	},
	isReady: {
		label: 'Pronto',
		value: false,
	},
}

let filters = reactive(JSON.parse(JSON.stringify(initStateFilters)))

const mappedFilters = (): Record<string, string | number | boolean> => {
	const obj = {
		value: value.value,
	}
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	Object.entries(filters).map((value: [string, any]) => {
		Object.defineProperty(obj, value[0], {
			value: value[1].value,
			writable: false,
		})
	})
	return obj
}

const value = ref(props.input)
const optionsActive = ref(false)
const clearQuery = () => {
	value.value = ''
	Object.assign(filters, initStateFilters)
	emitValue()
}
const emitValue = () => {
	emit('update:input', mappedFilters())
}
watch(filters, () => {
	emitValue()
})
</script>
<style lang="scss">
.filter-icon {
	padding: 7px;
	border-radius: 25px;
	&.active {
		@apply bg-gray-600 text-white;
	}
}
.filter-container {
	@apply dark:bg-gray-800 dark:text-white p-0 transition-all;
	border-radius: 25px;
	border-top-left-radius: 0;
	border-top-right-radius: 0;
	height: 0;
	overflow: hidden;
	display: grid;
	gap: 5px;
	grid-auto-flow: column;
	grid-auto-columns: max-content;
	&.active {
		min-height: 100px;
		@apply p-3 transition-all;
	}
}
</style>
