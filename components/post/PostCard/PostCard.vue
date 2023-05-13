<script lang="ts" setup>
defineProps({
	post: {
		type: Object,
		required: true,
	},
})
</script>

<template>
	<BaseCard>
		<div class="flex flex-row flex-wrap">
			<div class="w-full mb-1">
				{{ post.title.rendered }}
			</div>
			<img
				v-show="post.image_url"
				class="lg:w-2/6 w-full object-scale-down"
				crossorigin="anonymous"
				loading="lazy"
				:src="post.image_url"
			/>
			<div
				class="lg:w-4/6 w-full"
				:class="{ 'pl-2': post.image_url }"
				v-html="post.excerpt.rendered"
			></div>
		</div>
	</BaseCard>
</template>
