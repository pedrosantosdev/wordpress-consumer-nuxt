<script setup lang="ts">
import { PostDomain } from '@/types/Post'
import { usePostDomainsStore } from '@/state/posts/domains'
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'

const domainsStore = usePostDomainsStore()
const { list: domains, isLoading } = storeToRefs(domainsStore)
const isLoadingRefresh = ref(false)

onBeforeMount(() => {
	if (!isLoading.value && domains?.value?.length === 0) {
		domainsStore.get()
	}
})

const refreshHealth = () => {
	isLoadingRefresh.value = true
	domainsStore
		.updateHealth()
		.then(() => domainsStore.get())
		.finally(() => (isLoadingRefresh.value = false))
}

const saveEmit = (postDomain: PostDomain) => {
	if (postDomain.id > 0) {
		domainsStore.update(postDomain)
	} else {
		domainsStore.add(postDomain).then(() => domainsStore.get())
	}
}
const deleteEmit = (postDomain: PostDomain) => domainsStore.delete(postDomain.id)
</script>
<template>
	<transition>
		<NuxtIcon v-if="isLoading" class="spinner" name="spinner" />
		<div v-else class="post-domain-form">
			<PostDomainInputRow
				v-for="domain in domains"
				:key="domain.id"
				:input="domain"
				@save="saveEmit"
				@delete="deleteEmit"
			/>
			<PostDomainInputRow :is-new="true" @save="saveEmit" />
			<NuxtIcon
				class="cursor-pointer p-2 absolute left-2 top-1"
				:class="{ spinner: isLoadingRefresh }"
				name="spinner"
				@click="refreshHealth"
			/>
		</div>
	</transition>
</template>
