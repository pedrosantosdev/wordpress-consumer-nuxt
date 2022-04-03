<template>
  <div class="relative bg-white dark:bg-gray-800">
    <div class="flex flex-col sm:flex-row sm:justify-around">
      <div class="w-64 h-screen">
        <!-- <div class="flex items-center justify-start mx-6 mt-10">
          <img class="h-10" src="/icons/rocket.svg" />
          <span
            class="text-gray-600 dark:text-gray-300 ml-4 text-2xl font-bold"
          >
            Tail-Kit
          </span>
        </div> -->
        <nav class="mt-10 px-6">
          <NuxtLink
            v-for="link in links"
            :key="link.path"
            :to="link.path"
            :class="link.cssClass"
            class="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200 text-gray-600 dark:text-gray-400"
            href="#"
          >
            <!-- <svg
              width="20"
              height="20"
              fill="currentColor"
              class="m-auto"
              viewBox="0 0 2048 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1024 1131q0-64-9-117.5t-29.5-103-60.5-78-97-28.5q-6 4-30 18t-37.5 21.5-35.5 17.5-43 14.5-42 4.5-42-4.5-43-14.5-35.5-17.5-37.5-21.5-30-18q-57 0-97 28.5t-60.5 78-29.5 103-9 117.5 37 106.5 91 42.5h512q54 0 91-42.5t37-106.5zm-157-520q0-94-66.5-160.5t-160.5-66.5-160.5 66.5-66.5 160.5 66.5 160.5 160.5 66.5 160.5-66.5 66.5-160.5zm925 509v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm0-260v-56q0-15-10.5-25.5t-25.5-10.5h-568q-15 0-25.5 10.5t-10.5 25.5v56q0 15 10.5 25.5t25.5 10.5h568q15 0 25.5-10.5t10.5-25.5zm0-252v-64q0-14-9-23t-23-9h-576q-14 0-23 9t-9 23v64q0 14 9 23t23 9h576q14 0 23-9t9-23zm256-320v1216q0 66-47 113t-113 47h-352v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-768v-96q0-14-9-23t-23-9h-64q-14 0-23 9t-9 23v96h-352q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1728q66 0 113 47t47 113z"
              ></path>
            </svg> -->
            <span class="mx-4 text-lg font-normal">
              {{ link.label }}
            </span>
            <span class="flex-grow text-right"> </span>
          </NuxtLink>
        </nav>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BaseNavBar',
  data() {
    return {
      links: [
        { label: 'Home', path: '/' },
        { label: 'Movies', path: '/movies' },
      ],
    }
  },
})
</script>
<style lang="scss" scoped>
a.nuxt-link-active {
  font-weight: bold;
}
</style>
