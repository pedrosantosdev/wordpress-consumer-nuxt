<script lang="ts" setup>
const { t } = useI18n()

definePageMeta({
	validate: async (route) => {
		return (
			typeof route.params.id === 'string' &&
			typeof route.params.domainId === 'string' &&
			/^\d+$/.test(route.params.id) &&
			/^\d+$/.test(route.params.domainId)
		)
	},
})
</script>

<template>
	<Suspense>
		<PostDetailsApp
			:id="+$route.params?.id?.toString()"
			:domain-id="+$route.params?.domainId?.toString()"
		/>
		<template #fallback> {{ t('loading') }}... </template>
	</Suspense>
</template>
