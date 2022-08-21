<script setup lang="ts">
import { PostDomain } from '@/types/Post'
import { usePostDomainsStore } from '@/state/posts/domains'
import { storeToRefs } from 'pinia'

const domainsStore = usePostDomainsStore()
const { list: domains, isLoading } = storeToRefs(domainsStore)

onBeforeMount(() => {
  if (!isLoading.value && domains?.value?.length === 0) {
    domainsStore.get()
  }
})

const saveEmit = (postDomain: PostDomain) => domainsStore.add(postDomain)
const deleteEmit = (postDomain: PostDomain) =>
  domainsStore.delete(postDomain.id)
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
    </div>
  </transition>
</template>
