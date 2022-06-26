<template>
  <div class="relative w-full md:h-14">
    <div class="block pl-3 pt-3" :class="{ hidden: !isMobile || hide }">
      <input
        id="base-nav-bar"
        v-model="isActive"
        class="hidden"
        type="checkbox"
        name="base-nav-bar"
      />
      <label for="base-nav-bar" class="base-nav-bar-icon">
        <nuxt-icon name="hamburguer" />
      </label>
    </div>
    <div
      class="base-nav-bar-container"
      :class="{ active: showNavBar, hidden: hide }"
    >
      <div
        class="items-center inline-flex md:mx-3 px-10 gap-6 w-full md:w-auto"
      >
        <img class="h-10" src="@/assets/icons/nuxt.png" />
        <label
          for="base-nav-bar"
          :class="{ hidden: !isMobile }"
          class="base-nav-bar-icon"
        >
          <nuxt-icon name="hamburguer" />
        </label>
      </div>
      <nav class="mt-5 px-6 md:mt-0 md:flex md:flex-row">
        <NuxtLink
          v-for="{ label, path } in links"
          :key="path.toString()"
          :to="path.toString()"
          class="
            hover:text-gray-800
            hover:bg-gray-100
            flex
            items-center
            p-2
            my-6
            md:my-1
            transition-colors
            dark:hover:text-white
            dark:hover:bg-gray-600
            duration-200
            text-gray-600
            dark:text-gray-400
          "
        >
          <span class="mx-4 text-lg font-normal">
            {{ label }}
          </span>
          <span class="flex-grow text-right"> </span>
        </NuxtLink>
      </nav>
    </div>
  </div>
</template>
<script setup lang="ts">
import { LinksModel } from '@/types/Links'

const $route = useRoute()

const links = ref([
  { label: 'Home', path: '/' },
  { label: 'Movies', path: '/movies' },
] as unknown as LinksModel[])
const isActive = ref(false)
const isMobile = ref(false)
const showNavBar = computed(() => !!isActive.value)
const hide = computed(() => $route.name === 'login')
const windowResize = () => {
  isActive.value = process.client ? window.innerWidth > 768 : true
  isMobile.value = process.client ? window.innerWidth < 768 : false
}
onMounted(() => {
  if (process.client) {
    isActive.value = window.innerWidth > 768
    isMobile.value = window.innerWidth < 768
    window.addEventListener('resize', useDebounce(windowResize, 250))
  }
})
onUnmounted(() => {
  window.removeEventListener('resize', windowResize)
})
</script>
<style lang="scss" scoped>
a.nuxt-link-active {
  font-weight: bold;
}
.base-nav-bar-icon {
  &:not(.hidden) {
    @apply flex;
  }
  @apply cursor-pointer items-center justify-center w-10;
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
    &.active {
      @apply left-0;
    }
  }
}
</style>
