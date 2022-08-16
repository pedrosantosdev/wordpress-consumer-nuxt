<template>
  <div
    class="
      lg:w-96
      w-full
      sm:h-64
      md:h-auto
      flex flex-col
      sm:flex-row
      p-2
      sm:p-4
      rounded-2xl
      shadow-lg
      gap-5
      select-none
    "
    :class="bgColor"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  bgColor: {
    type: String,
    default: 'bg-white dark:bg-gray-800 dark:text-white',
    required: false,
  },
})
</script>
