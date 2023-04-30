<template>
	<nav class="relative w-full md:h-14" :class="{ sticky: goingUp }">
		<div class="block pl-3 pt-3" :class="{ hidden: !isMobile }">
			<label class="base-nav-bar-icon" @click.prevent="() => (isActive = !isActive)">
				<NuxtIcon name="hamburguer" />
			</label>
		</div>
		<div class="base-nav-bar-container" :class="{ active: showNavBar }">
			<div class="items-center inline-flex md:mx-3 px-10 gap-6 w-full md:w-auto">
				<label
					:class="{ hidden: !isMobile && !showNavBar }"
					class="base-nav-bar-icon"
					@click.prevent="() => (isActive = false)"
				>
					<NuxtIcon name="hamburguer" />
				</label>
			</div>
			<nav class="mt-5 px-6 md:mt-0 md:flex md:flex-row">
				<NuxtLink
					v-for="{ label, path } in links"
					:key="path"
					:to="path"
					class="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 md:my-1 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200 text-gray-600 dark:text-gray-400"
				>
					<span class="mx-4 text-lg font-normal">
						{{ label }}
					</span>
					<span class="flex-grow text-right"> </span>
				</NuxtLink>
			</nav>
		</div>
	</nav>
</template>
<script setup lang="ts">
import { LinksModel } from '@/types/Links'
import { ref, computed } from 'vue'
const { isMobile } = useDevice()

const links = ref([
	{ label: 'Home', path: '/' },
	{ label: 'Movies', path: '/movies' },
	{ label: 'Posts', path: '/posts' },
] as unknown as LinksModel[])
const isActive = ref(false)
const showNavBar = computed(() => !!isActive.value)
const { directions } = useScroll(document.body)
const goingUp = computed(() => !directions.bottom)
</script>
<style lang="scss">
nav {
	z-index: 1;
	top: 0;
	a.nuxt-link-active {
		font-weight: bold;
	}
	.base-nav-bar-icon {
		&:not(.hidden) {
			@apply flex;
		}
		@apply cursor-pointer items-center justify-center w-10 dark:text-white text-black text-2xl;
	}
	.base-nav-bar-container {
		@apply w-64 h-screen md:w-full md:h-14 md:relative fixed top-0 z-10 md:flex-row bg-white dark:bg-gray-800;
		&:not(.hidden) {
			@apply md:flex;
		}
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
