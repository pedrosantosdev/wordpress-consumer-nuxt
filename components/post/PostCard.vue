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
    <div class="flex flex-row flex-wrap">
      <div class="w-full mb-1">
        {{ post.title.rendered }}
      </div>
      <img class="lg:w-2/6 w-full object-scale-down" :src="post.image_url" />
      <div class="lg:w-4/6 w-full pl-2" v-html="post.excerpt.rendered"></div>
    </div>
  </BaseCardDefault>
</template>

