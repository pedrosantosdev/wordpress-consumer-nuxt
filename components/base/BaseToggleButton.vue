<template>
	<button
		class="filter-button"
		:class="{ active: modelValue }"
		@click.prevent="$emit('update:modelValue', !modelValue)"
	>
		<NuxtIcon :name="showIcon" />
		{{ label }}
	</button>
</template>
<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
	modelValue: boolean
	label: string
}>()
defineEmits(['update:modelValue'])
const showIcon = computed(() => (props.modelValue ? 'check' : 'times'))
</script>

<style lang="scss">
@use '@/assets/scss/abstract/variables';
.filter-button {
	border-radius: 12px;
	border-width: 1px;
	border-color: variables.$grey;
	display: flex;
	align-items: center;
	gap: 5px;
	padding: 2px 10px;
	height: fit-content;
	&.active {
		border-color: variables.$green-light;
	}
	.nuxt-icon {
		padding-top: 1px;
	}
}
</style>
