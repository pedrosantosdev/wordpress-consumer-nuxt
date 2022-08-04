<script setup lang="ts">
defineProps({
  type: {
    type: String,
    default: 'text',
    required: false,
  },
})
</script>

<template>
  <input
    class="
      shadow
      appearance-none
      border
      rounded
      w-full
      py-2
      px-3
      text-gray-700
      leading-tight
      focus:outline-none
      focus:shadow-outline
    "
    :type="type"
  />
</template>
