<template>
	<div
		class="lg:w-96 w-full sm:h-64 md:h-auto flex flex-col sm:flex-row p-2 sm:p-4 rounded-2xl shadow-lg gap-5 select-none dark:bg-gray-800"
		:class="bgColor"
	>
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
withDefaults(
	defineProps<{
		bgColor?: string
	}>(),
	{
		bgColor: 'bg-white dark:bg-gray-800 dark:text-white',
	}
)
</script>
