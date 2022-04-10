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
      <label for="base-nav-bar" class="base-nav-bar-icon"
        ><fa-icon :icon="iconMenu" class="dark:text-white"
      /></label>
    </div>
    <div
      class="base-nav-bar-container w-64 h-screen md:w-full md:h-14 md:relative fixed top-0 z-10 md:flex md:flex-row bg-white dark:bg-gray-800"
      :class="{ active: showNavBar, hidden: hide }"
    >
      <div
        class="items-center inline-flex md:mx-3 px-10 gap-6 w-full md:w-auto"
      >
        <img class="h-10" src="/_nuxt/icons/icon_512x512.e3e9fb.png" />
        <label
          for="base-nav-bar"
          :class="{ hidden: !isMobile }"
          class="base-nav-bar-icon"
          ><fa-icon :icon="iconMenu" class="dark:text-white"
        /></label>
      </div>
      <nav class="mt-5 px-6 md:mt-0 md:flex md:flex-row">
        <NuxtLink
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          :class="link.cssClass"
          class="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 md:my-1 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200 text-gray-600 dark:text-gray-400"
          href="#"
        >
          <span class="mx-4 text-lg font-normal">
            {{ link.label }}
          </span>
          <span class="flex-grow text-right"> </span>
        </NuxtLink>
      </nav>
    </div>
  </div>
</template>
<script lang="ts">
import { faHelmetSafety } from '@fortawesome/free-solid-svg-icons'
import Vue from 'vue'
import { debounce } from '~/helpers/utils'

export default Vue.extend({
  name: 'BaseNavBar',
  data() {
    return {
      links: [
        { label: 'Home', path: '/' },
        { label: 'Movies', path: '/movies' },
      ],
      isActive: false,
    }
  },
  computed: {
    showNavBar() {
      return this.$data.isActive
    },
    isMobile() {
      if (process.client) {
        // eslint-disable-next-line no-unused-expressions
        return window.innerWidth < 768
      }
      return false
    },
    iconMenu() {
      return faHelmetSafety
    },
    hide() {
      return this.$route.name === 'login'
    },
  },
  created() {
    // eslint-disable-next-line nuxt/no-env-in-hooks
    if (process.client) {
      // eslint-disable-next-line nuxt/no-globals-in-created
      window.addEventListener('resize', debounce(this.windowResize, 250))
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.windowResize)
  },
  methods: {
    windowResize() {
      this.$data.isActive = window.innerWidth > 768
    },
  },
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
