<template>
	<BaseCardDefault bg-color="bg-red-300 dark:bg-red-500 dark:text-white">
		<slot>Error</slot>
	</BaseCardDefault>
</template>

<script setup lang="ts">
import BaseCardDefault from '@/components/base/CardDefault/CardDefault.vue'
</script>
