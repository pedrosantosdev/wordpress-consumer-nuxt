<template>
	<header class="fixed w-full md:h-14 duration-200 transition-all">
		<div v-if="isMobile" class="block pl-3 pt-3">
			<NuxtIcon name="hamburguer" @click.prevent="() => (isActive = !isActive)" />
		</div>
		<div class="base-nav-bar-container" :class="{ active: isActive }">
			<div
				v-if="isMobile"
				class="items-center inline-flex pt-3 md:mt-0 md:ml-3 px-9 gap-6 w-full md:w-auto"
				@click.prevent="() => (isActive = false)"
			>
				<NuxtIcon name="hamburguer" />
			</div>
			<nav class="mt-3 px-6 md:mt-0 flex flex-row flex-wrap">
				<NuxtLink
					v-for="{ label, path } in links"
					:key="path"
					:to="path"
					class="pl-3 md:px-5 md:pt-2 py-4 md:py-0 md:my-1 w-full md:w-auto text-gray-600 dark:text-gray-400 hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 transition-colors duration-200 text-lg font-normal"
				>
					{{ label }}
				</NuxtLink>
			</nav>
		</div>
	</header>
</template>
<script setup lang="ts">
import { LinksModel } from '@/types/Links'
import { ref } from 'vue'
const { isMobile } = useDevice()

const links = ref([
	{ label: 'Home', path: '/' },
	{ label: 'Movies', path: '/movies' },
	{ label: 'Posts', path: '/posts' },
] as unknown as LinksModel[])
const isActive = ref(false)
</script>
<style lang="scss">
header {
	@apply top-0 z-10;
	.nuxt-link-active,
	.router-link-active,
	.router-link-exact-active {
		font-weight: bold;
		@apply text-gray-800 bg-gray-100 dark:text-white dark:bg-gray-600;
	}
	.nuxt-icon {
		@apply cursor-pointer w-10 dark:text-white text-black text-2xl;
	}
	.base-nav-bar-container {
		@apply w-64 h-screen md:w-full md:h-14 md:relative fixed top-0 z-20 md:flex md:flex-row bg-white dark:bg-gray-800;
	}
	@media (max-width: 768px) {
		.base-nav-bar-container {
			@apply -left-full;
			transition: left 0.6s ease;
			&::after {
				content: '';
				background-color: black;
				position: fixed;
				right: 0;
				top: 0;
				z-index: -1;
				opacity: 0;
			}
			&.active {
				@apply left-0;
				&::after {
					width: calc(100% - 16rem);
					height: 100%;
					opacity: 0.4;
					transition: opacity 0.3s ease;
					transition-delay: 0.5s;
				}
			}
		}
	}
}
</style>
