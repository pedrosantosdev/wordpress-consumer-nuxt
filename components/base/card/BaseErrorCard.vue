<template>
  <base-default-card bg-color="bg-red-300 dark:bg-red-500 dark:text-white">{{
    error
  }}</base-default-card>
</template>

<script lang="ts">
import BaseDefaultCard from './BaseDefaultCard.vue'
export default {
  name: 'BaseErrorCard',
  components: { BaseDefaultCard },
  props: {
    error: {
      type: String,
      default: 'Error',
      required: false,
    },
  },
}
</script>
