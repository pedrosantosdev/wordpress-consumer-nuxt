<script setup lang="ts">
import BaseNavbar from '@/components/base/BaseNavbar.vue'
import BaseToast from '@/components/base/BaseToast.vue'

const hide = computed(() => useRoute().name === 'login')
</script>
<template>
	<div class="main-content">
		<BaseNavbar v-if="!hide" />
		<slot />
		<BaseToast />
	</div>
</template>
