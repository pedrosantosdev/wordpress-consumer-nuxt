<script setup lang="ts">
import { type PostDomain } from '@/types/Post'
import { usePostDomainsStore } from '@/state/posts/domains'
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'
import { useToastStore } from '@/state/toast';

const domainsStore = usePostDomainsStore()
const { list: domains } = storeToRefs(domainsStore)
const isLoadingRefresh = ref(false)
const toastStore = useToastStore()

onBeforeMount(() => {
	if (domains?.value?.length !== 0 || isLoadingRefresh.value) {
		return
	}
	domainsStore.get()
})

function refreshHealth() {
	isLoadingRefresh.value = true
	domainsStore
		.updateHealth()
		.then(() => domainsStore.get())
		.finally(() => (isLoadingRefresh.value = false))
}

function saveEmit(postDomain: PostDomain) {
	isLoadingRefresh.value = true
	if (postDomain.id > 0) {
		domainsStore.update(postDomain).finally(() => {
			isLoadingRefresh.value = false
		})
		return
	}
	if (domains?.value?.some((domain: PostDomain) => domain.endpoint == postDomain.endpoint)) {
		toastStore.showToast('Already Exists', {
			status: 'error'
		})
		return
	}
	domainsStore
		.add(postDomain)
		.then(() => domainsStore.get())
		.finally(() => {
			isLoadingRefresh.value = false
		})
}
function deleteEmit(postDomain: PostDomain) {
	isLoadingRefresh.value = true
	domainsStore.delete(postDomain.id).finally(() => {
		isLoadingRefresh.value = false
	})
}
</script>
<template>
	<transition>
		<NuxtIcon v-if="isLoadingRefresh" class="spinner" name="spinner" />
		<div v-else class="post-domain-form">
			<PostDomainInputRow
				v-for="domain in domains"
				:key="domain.id"
				:domain="domain"
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
