<script lang="ts" setup>
const { t } = useI18n()

definePageMeta({
	validate: async (route) => {
		return typeof route.params.id === 'string' && /^\d+$/.test(route.params.id)
	},
})
</script>

<template>
	<Suspense>
		<PostDetailsApp :id="+$route.params?.id?.toString()" />
		<template #fallback> {{ t('loading') }}... </template>
	</Suspense>
</template>
