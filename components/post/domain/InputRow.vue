<script setup lang="ts">
// https://comando.to/wp-json/wp/v2
// https://comando.to/wp-json/wp-site-health/v1/
const props = defineProps({
  isNew: {
    type: Boolean,
    default: false,
    required: false,
  },
  input: {
    type: Object,
    default: null,
    required: false,
  },
})
const defaultWordpressPath = {
  endpoint: 'wp-json/wp/v2/',
  healthEndpoint: 'wp-json/wp-site-health/v1/',
}
const domain = reactive(props.input ?? { endpoint: '', healthEndpoint: '' })
const emit = defineEmits(['save', 'delete'])
const isEditing = ref(false)
const canType = computed(() => props.isNew || isEditing.value)
const onSaveClick = () => {
  isEditing.value = false
  emit('save', domain)
}
const onDeleteClick = () => emit('delete', domain)
</script>

<template>
  <div class="post-domain-input relative">
    <BaseInput v-model="domain.endpoint" :readonly="!canType" />
    <BaseInput v-model="domain.healthEndpoint" :readonly="!canType" />
    <div v-if="isNew" class="icon-group">
      <NuxtIcon name="check" @click="onSaveClick" />
    </div>
    <div v-else class="icon-group">
      <transition>
        <NuxtIcon v-if="isEditing" name="check" @click="onSaveClick" />
      </transition>
      <NuxtIcon name="pencil" @click="isEditing = !isEditing" />
      <NuxtIcon name="times" @click="onDeleteClick" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.post-domain-input {
  display: grid;
  gap: 10px;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  margin-bottom: 10px;
  width: 100%;
  .icon-group {
    display: flex;
    gap: 10px;
    width: 20%;
    span {
      cursor: pointer;
      width: 40px;
      padding: 10px;
      border: 1px solid grey;
      color: #68d391;
      border-radius: 25px;
      svg {
        padding: 2px 0 0 2px;
      }
    }
  }
}
</style>
