<template>
	<BaseCard bg-color="bg-red-300 dark:bg-red-500 dark:text-white">
		<slot>Error</slot>
	</BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue'
</script>
