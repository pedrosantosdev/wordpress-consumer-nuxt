<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		showIcon?: boolean
		disabled?: boolean
	}>(),
	{
		showIcon: false,
		disabled: false,
	}
)
const emit = defineEmits(['click'])
function onClickButton() {
	if (!props.disabled) {
		emit('click')
	}
}
</script>

<template>
	<button
		type="button"
		:disabled="disabled"
		class="py-2 px-4 h-10 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
		@click.prevent="onClickButton"
	>
		<NuxtIcon v-if="showIcon" class="spinner" name="spinner" />
		<span v-else><slot></slot></span>
	</button>
</template>
