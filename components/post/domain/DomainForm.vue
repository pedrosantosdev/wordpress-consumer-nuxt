<script setup lang="ts">
import { PostDomain } from '@/types/Post'

const fields: PostDomain[] = reactive([])
</script>
<template>
  <div>
    <PostDomainInput
      v-for="field in fields"
      :key="field.id"
      v-model="field.endpoint"
    />
    <PostDomainInput :is-new="true" />
  </div>
</template>
