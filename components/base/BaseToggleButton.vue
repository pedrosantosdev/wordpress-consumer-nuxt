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
.filter-button {
	border-radius: 12px;
	border-width: 1px;
	border-color: gray;
	display: flex;
	align-items: center;
	gap: 5px;
	padding: 2px 10px;
	height: fit-content;
	&.active {
		border-color: #68d391;
	}
	.nuxt-icon {
		padding-top: 1px;
	}
}
</style>
