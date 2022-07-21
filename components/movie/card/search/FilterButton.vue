<template>
  <button
    class="filter-button"
    :class="{ active: modelValue }"
    @click.prevent="$emit('update:modelValue', !modelValue)"
  >
    <nuxt-icon v-if="modelValue" name="check" />
    <nuxt-icon v-else name="times" />
    {{ label }}
  </button>
</template>
<script setup lang="ts">
defineProps({ modelValue: Boolean, label: { type: String, default: '' } })
defineEmits(['update:modelValue'])
</script>

<style lang="scss">
.filter-button {
  border-radius: 12px;
  border-width: 1px;
  border-color: grey;
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 2px 10px;
  width: 90px;
  &.active {
    border-color: #68d391;
  }
  .nuxt-icon {
    padding-top: 1px;
  }
}
</style>
