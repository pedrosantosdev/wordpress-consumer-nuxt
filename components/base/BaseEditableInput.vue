<script setup lang="ts">
import { getCurrentInstance } from 'vue'
const props = defineProps<{
	isNew: boolean
	checked: boolean
	isInvalid: boolean
	inputs: {
		id: string | number
		type: string
		value: string
	}[]
}>()
const models = reactive(props.inputs)
const emit = defineEmits(['save', 'delete', 'toggle'])
const isEditing = ref(false)
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
	<div class="editable-input relative px-4 py-2" :class="{ 'bg-red-300': isInvalid }">
		<BaseInput
			v-for="model in models"
			:key="model.id"
			v-model="model.value"
			:type="model.type"
			:readonly="!canType"
		/>
		<div v-if="isNew" class="icon-group">
			<NuxtIcon name="check" @click="onSaveClick" />
		</div>
		<div v-else class="icon-group">
			<div class="flex self-center">
				<BaseSwitchToggle
					:id="`${getCurrentInstance()?.vnode?.key?.toString() ?? ''}-editable-input`"
					:default-state="checked"
					@toggle="toggleActive"
				/>
			</div>
			<transition>
				<NuxtIcon v-show="isEditing" name="check" @click="onSaveClick" />
			</transition>
			<NuxtIcon v-show="!isEditing" name="pencil" @click="isEditing = !isEditing" />
			<NuxtIcon name="times" @click="onDeleteClick" />
		</div>
	</div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/abstract/_variables.scss';
.editable-input {
	@apply w-full grid gap-3 grid-flow-col scroll-smooth overflow-hidden overflow-x-auto;
	grid-auto-columns: max-content;
	.icon-group {
		@apply flex gap-3 w-1/5;
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
