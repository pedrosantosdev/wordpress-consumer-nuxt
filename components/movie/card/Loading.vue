<template>
  <base-card-default>
    <div
      class="sm:w-72 h-52 sm:h-full rounded-xl animate-pulse"
      :class="bgColor"
    ></div>
    <div class="flex flex-1 flex-col gap-5 sm:p-2 sm:pt-0">
      <div class="flex flex-1 flex-col gap-3">
        <div
          class="w-full h-16 rounded-2xl animate-pulse"
          :class="bgColor"
        ></div>
        <div
          class="w-full h-16 rounded-2xl animate-pulse"
          :class="bgColor"
        ></div>
      </div>
      <div class="flex mt-auto gap-3">
        <div class="w-20 h-8 rounded-full animate-pulse" :class="bgColor"></div>
        <div class="w-20 h-8 rounded-full animate-pulse" :class="bgColor"></div>
        <div
          class="w-20 h-8 rounded-full ml-auto animate-pulse"
          :class="bgColor"
        ></div>
      </div>
    </div>
  </base-card-default>
</template>

<script setup lang="ts">
defineProps({
  bgColor: {
    type: String,
    default: 'bg-gray-200 dark:bg-gray-600',
    required: false,
  },
})
</script>
