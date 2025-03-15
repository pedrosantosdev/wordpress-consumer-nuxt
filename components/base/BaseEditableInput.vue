<script setup lang="ts">
import { computed, defineProps, defineEmits, reactive, ref, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'

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

const { t } = useI18n()
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
	<div class="editable-input" :class="{ 'bg-red-300': props.isInvalid }">
		<template v-if="props.draggableClass">
			<div :class="props.draggableClass">
				<button
					class="drag-handle cursor-move p-1 text-gray-400 hover:text-gray-600"
					aria-label="Drag to reorder"
				>
					<NuxtIcon name="grip-vertical" />
				</button>
			</div>
		</template>
		<template v-for="model in models" :key="model.id">
			<BaseInput v-model="model.value" :type="model.type" :readonly="!canType" />
		</template>
		<button
			v-show="props.isNew || isEditing"
			class="icon-group"
			aria-label="Save Field"
			@click="onSaveClick"
		>
			<NuxtIcon name="check" />
		</button>
		<div v-if="!props.isNew" class="icon-group">
			<div class="relative z-10">
				<button class="rounded p-1" aria-label="Field options" @click="showMenu = !showMenu">
					<NuxtIcon name="list" />
				</button>
				<div
					v-show="showMenu"
					class="absolute right-0 top-full z-20 mt-1 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
					@blur="showMenu = false"
				>
					<button
						v-if="!props.isNew"
						class="icon-group"
						aria-label="Toogle Edit Field"
						@click="isEditing = !isEditing"
					>
						{{ t('edit') }}
					</button>
					<button
						class="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
						@click="toggleActive"
					>
						{{ props.checked ? t('disable') : t('enable') }}
					</button>
					<button
						class="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
						@click="onDeleteClick"
					>
						{{ t('delete') }}
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/abstract/_variables.scss';

.editable-input {
	@apply w-full grid gap-4 grid-flow-col scroll-smooth relative pr-4 py-2 items-center;
	grid-auto-columns: max-content;

	.icon-group {
		@apply flex flex-col gap-3 hover:text-gray-600;

		span {
			@apply cursor-pointer p-3 w-10;
			color: variables.$green-light;

			svg {
				@apply px-1 py-0;
			}
		}
	}
}
</style>
