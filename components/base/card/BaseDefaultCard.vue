<template>
  <div
    class="lg:w-96 w-full sm:h-64 flex flex-col sm:flex-row p-2 sm:p-4 rounded-2xl shadow-lg gap-5 select-none"
    :class="bgColor"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BaseDefaultCard',
  props: {
    bgColor: {
      type: String,
      default: 'bg-white dark:bg-gray-800 dark:text-white',
      required: false,
    },
  },
}
</script>
