<script setup lang="ts">
import { computed, defineProps, defineEmits, reactive, ref, toRefs } from 'vue'

const props = defineProps<{
	isNew: boolean
	checked: boolean
	isInvalid: boolean
	inputs: {
		id: string | number
		type: string
		value: string
	}[]
	draggableClass?: string
}>()

const { inputs } = toRefs(props)
const models = reactive(inputs.value)
const emit = defineEmits(['save', 'delete', 'toggle'])
const isEditing = ref(false)
const showMenu = ref(false)
const canType = computed(() => props.isNew || isEditing.value)

function onSaveClick() {
	emit('save', { input: models, checked: props.checked })
}

function onDeleteClick() {
	emit('delete', { input: models, checked: props.checked })
}

function toggleActive() {
	emit('toggle', { input: models, checked: props.checked })
}
</script>

<template>
	<div
		class="editable-input relative px-4 py-2"
		:class="{ 'bg-red-300': props.isInvalid, 'opacity-50': !canType }"
	>
		<template v-if="props.draggableClass">
			<div :class="props.draggableClass">
				<button
					class="drag-handle cursor-move p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					aria-label="Drag to reorder"
				>
					<NuxtIcon name="grip-vertical" />
				</button>
			</div>
		</template>
		<template v-for="model in models" :key="model.id">
			<BaseInput v-model="model.value" :type="model.type" :readonly="!canType" />
		</template>
		<div v-if="props.isNew || isEditing" class="icon-group">
			<NuxtIcon name="check" @click="onSaveClick" />
		</div>
		<NuxtIcon name="mail" v-if="!props.isNew" />
		<div v-if="!props.isNew" class="icon-group">
			<div class="relative">
				<button
					@click="showMenu = !showMenu"
					class="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
					aria-label="Field options"
				>
					<NuxtIcon name="list" />
				</button>

				<div
					v-show="showMenu"
					class="absolute right-0 top-full z-10 mt-1 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
					@blur="showMenu = false"
				>
					<button
						@click="toggleActive"
						class="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
					>
						<Toggle class="mr-2 h-4 w-4" />
						{{ isEditing ? 'Disable' : 'Enable' }}
					</button>
					<button
						@click="onDeleteClick"
						class="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
					>
						<NuxtIcon name="times" />
						Delete
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/abstract/_variables.scss';

.editable-input {
	@apply w-full grid gap-3 grid-flow-col scroll-smooth overflow-hidden overflow-x-auto;
	grid-auto-columns: max-content;

	.icon-group {
		@apply flex flex-col gap-3 w-1/5 absolute z-20;

		span {
			@apply cursor-pointer p-3 w-10;
			border: 1px solid variables.$grey;
			color: variables.$green-light;
			border-radius: 25px;

			svg {
				@apply px-1 py-0;
			}
		}
	}
}
</style>
