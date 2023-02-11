<script setup lang="ts">
import debounce from "@/helpers/debounce";
import { computed } from "@vue/reactivity";

const emit = defineEmits(["update:modelValue", "enter", "debounce"]);
const props = withDefaults(
  defineProps<{
    label: string;
    readonly?: boolean;
    type?: string;
    modelValue: string | number;
  }>(),
  {
    label: "",
    readonly: false,
    type: "text",
    modelValue: "",
  }
);
const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});
const dispatchValue = () => emit("debounce", value.value);
const keyDownEnter = () => emit("enter", value.value);
</script>

<template>
  <label v-if="label">{{ label }}</label>
  <input
    v-model="value"
    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline disabled:outline-none disabled:shadow-outline"
    :readonly="readonly"
    :disabled="readonly"
    :type="type"
    @input="debounce(() => dispatchValue())"
    @keydown.enter="keyDownEnter"
  />
</template>
