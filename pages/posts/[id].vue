<script lang="ts" setup>
import { useRoute, abortNavigation } from 'nuxt/app'

definePageMeta({
	validate: async (route) => {
		return /^\d+$/.test(route.params.id)
	},
})

const route = useRoute()
if (!route.params.id) {
	abortNavigation('404')
}
</script>

<template>
	<Suspense>
		<PostDetailsApp :id="+$route.params?.id?.toString()" />
		<template #fallback> Loading... </template>
	</Suspense>
</template>
