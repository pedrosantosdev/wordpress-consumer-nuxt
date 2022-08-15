<script lang="ts" setup>
defineProps({
  post: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <BaseCardDefault>
    {{ post.title.rendered }}
    <img :src="post.image_url" />
    <div v-html="post.excerpt.rendered"></div>
  </BaseCardDefault>
</template>
