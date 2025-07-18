<script setup lang="ts">
import type { PostDomain } from '@/types/Post'
import { usePostDomainsStore } from '@/app/state/posts/domains'
import { storeToRefs } from 'pinia'
import { onBeforeMount } from 'vue'
import { useToastStore } from '@/app/state/toast'
import { VueDraggable } from 'vue-draggable-plus'
import type { SortableEvent } from 'sortablejs'

const domainsStore = usePostDomainsStore()
const { list: domains } = storeToRefs(domainsStore)
const isLoadingRefresh = ref(false)
const toastStore = useToastStore()
const dragabbleClass = 'drag-handle'

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
			status: 'error',
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

function onUpdate(event: SortableEvent) {
	const newIndex = event.newIndex
	if (newIndex === undefined || event.oldIndex === newIndex) {
		return
	}
	const domain = domains?.value ? domains.value[event.oldIndex ?? 0] : undefined
	if (domain === undefined) {
		return
	}
	domain.viewOrder = newIndex
	const currentIndex =
		domains?.value?.findIndex((element: PostDomain) => element.id === domain.id) ?? -1
	domainsStore.updateOrder(
		domains?.value?.map((domain: PostDomain, index: number) => {
			return { id: domain.id, order: currentIndex <= index ? index : index + 1 }
		}) ?? [],
	)
}
</script>
<template>
	<transition>
		<NuxtIcon v-if="isLoadingRefresh" class="spinner" name="spinner" />
		<div v-else class="post-domain-form">
			<NuxtIcon
				class="cursor-pointer p-2 relative left-2 top-1"
				:class="{ spinner: isLoadingRefresh }"
				name="spinner"
				@click="refreshHealth"
			/>
			<VueDraggable
				ref="el"
				v-model="domains"
				item-key="id"
				:handle="`.${dragabbleClass}`"
				:animation="150"
				:disabled="(domains?.length ?? 0) <= 1"
				@update="onUpdate"
			>
				<PostDomainInputRow
					v-for="domain in domains"
					:key="domain.id"
					:domain="domain"
					:draggable-class="(domains?.length ?? 0) > 1 ? dragabbleClass : undefined"
					@save="saveEmit"
					@delete="deleteEmit"
				/>
			</VueDraggable>
			<PostDomainInputRow :is-new="true" class="pl-10" @save="saveEmit" />
		</div>
	</transition>
</template>
