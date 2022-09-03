<script setup lang="ts">
import debounce from '@/helpers/debounce'

const emit = defineEmits(['update:modelValue', 'enter', 'debounce'])
const props = defineProps({
  label: {
    type: String,
    default: '',
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'text',
    required: false,
  },
  modelValue: {
    type: [String, Number],
    default: '',
  },
})
const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})
const dispatchValue = () => emit('debounce', value.value)
const keyDownEnter = () => emit('enter', value.value)
</script>

<template>
  <label v-if="label">{{ label }}</label>
  <input
    v-model="value"
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
      disabled:outline-none
      disabled:shadow-outline
    "
    :readonly="readonly"
    :disabled="readonly"
    :type="type"
    @input="debounce(() => dispatchValue())"
    @keydown.enter="keyDownEnter"
  />
</template>
