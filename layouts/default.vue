<script setup lang="ts">
const hide = computed(() => useRoute().name === 'login')
</script>
<template>
	<div class="main-content">
		<BaseNavbar v-if="!hide" />
		<slot />
	</div>
</template>
