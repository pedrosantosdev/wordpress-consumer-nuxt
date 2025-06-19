<script lang="ts" setup>
import type { Post } from '@/types/Post'

defineProps({
	post: {
		type: Object as PropType<Post>,
		required: true,
	},
})
</script>

<template>
	<BaseCard>
		<div class="flex flex-row flex-wrap">
			<div class="w-full mb-1">
				{{ post.title }}
			</div>
			<img
				v-if="post.image_url"
				class="lg:w-2/6 w-full object-scale-down"
				loading="lazy"
				:src="post.image_url"
				onerror="this.style.display='none'"
			>
			<div v-safe-html="post.summary" class="lg:w-4/6 w-full" :class="{ 'pl-2': post.image_url }" />
		</div>
	</BaseCard>
</template>
