<template>
  <div
    class="
      relative
      inline-block
      w-10
      mr-2
      align-middle
      select-none
      transition
      duration-200
      ease-in
    "
  >
    <input
      :id="keyId"
      v-model="currentState"
      class="
        toggle-checkbox
        absolute
        block
        w-6
        h-6
        rounded-full
        bg-white
        border-4
        appearance-none
        cursor-pointer
      "
      type="checkbox"
      name="toggle"
      @change="onChangeToggle"
    />
    <label
      :for="keyId"
      class="
        toggle-label
        block
        overflow-hidden
        h-6
        rounded-full
        bg-gray-300
        cursor-pointer
      "
    ></label>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    required: true,
    default: '',
  },
  defaultState: {
    type: Boolean,
    required: false,
    default: false,
  },
  onToggleSwitch: {
    type: Function,
    required: false,
    default: null,
  },
})

const currentState = ref(props.defaultState)
const keyId = computed(() => props.id + '-input')
const onChangeToggle = () => {
  if (props.onToggleSwitch) {
    props.onToggleSwitch(currentState.value)
  }
}
</script>
<style lang="scss" scoped>
.toggle-checkbox:checked {
  @apply right-0 border-green-400;
  right: 0;
  border-color: #68d391;

  & + .toggle-label {
    @apply bg-green-400;
    background-color: #68d391;
  }
}
</style>
