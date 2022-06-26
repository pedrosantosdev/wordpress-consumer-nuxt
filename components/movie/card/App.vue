<template>
  <base-card-default>
    <div class="h-52 sm:h-full lg:w-1/3 w-full">
      <img
        v-if="hasImage"
        class="max-h-full mx-auto"
        :src="movie.image"
        :alt="movie.title"
      />
    </div>
    <div class="flex flex-col lg:w-2/3 w-full flex-1 gap-5 sm:p-2">
      <div class="flex flex-1 flex-col gap-3">
        <div class="w-full max-h-14 overflow-ellipsis">
          <h2>{{ movie.title }}</h2>
        </div>
        <div class="w-full min-h-3 max-h-20 line-clamp-3">
          {{ movie.overview }}
        </div>
      </div>
      <div class="mt-auto flex gap-3">
        <div class="w-24 h-8">
          {{ inCinemasDate }}
        </div>
        <div class="w-10 h-8"><nuxt-icon name="iconReady" fill /></div>
        <div class="w-14 h-8 ml-auto">
          <base-switch-toggle
            :id="`${movie.id}-sw`"
            :key="`${movie.id}-sw`"
            :default-state="movie.needSync"
            :on-toggle-switch="toggleSwitch"
          />
        </div>
      </div>
    </div>
  </base-card-default>
</template>

<script setup lang="ts">
import { MovieModel } from '@/types/Movie'
const props = defineProps({
  movie: {
    type: MovieModel,
    required: true,
  },
  onToggleSwitch: {
    type: Function,
    required: false,
    default: null,
  },
})
const iconReady = computed(() => (props.movie.hasFile ? 'check' : 'times'))
const hasImage = computed(() => !!props.movie.image)
const inCinemasDate = computed(() =>
  props.movie.inCinemas && props.movie.inCinemas !== 'TBA'
    ? new Date(props.movie.inCinemas.toString()).getDate()
    : 'TBA'
)
const toggleSwitch = (value: boolean) =>
  props.onToggleSwitch({ id: props.movie.id, needSync: value })
</script>
