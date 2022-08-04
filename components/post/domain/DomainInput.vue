<script setup lang="ts">
const props = defineProps({
  isNew: {
    type: Boolean,
    default: false,
    required: false,
  },
  input: {
    type: String,
    default: '',
    required: false,
  },
})
const value = ref(props.input)
const emit = defineEmits(['update:modelValue', 'save', 'delete'])
const isEditing = ref(false)
const clear = () => ''
</script>

<template>
  <div class="post-doman-input relative">
    <BaseInput v-model="value" :readonly="!isNew && isEditing" />
    <NuxtIcon
      class="absolute top-0 right-3 cursor-pointer py-3 px-4"
      name="times"
      @click.prevent="clear"
    />
    <div v-if="isNew" class="icon-group">
      <NuxtIcon name="check" />
    </div>
    <div v-else class="icon-group">
      <NuxtIcon v-if="isEditing" name="check" />
      <NuxtIcon name="check" @click="isEditing = !isEditing" />
      <NuxtIcon name="times" />
    </div>
  </div>
</template>

<style lang="scss">
.post-domain-input {
  display: flex;
  gap: 10px;
  .icon-group {
    display: flex;
    gap: 10px;
    span {
      width: 25px;
      padding: 10px;
      border: 1px solid black;
    }
  }
}
</style>
