<template>
  <base-default-card>
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
        <div class="w-10 h-8">
          <fa-icon :icon="iconReady" />
        </div>
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
  </base-default-card>
</template>

<script lang="ts">
import {
  faCheck,
  faTimes,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons'
import Vue, { PropType } from 'vue'
import BaseDefaultCard from '~/components/base/card/BaseDefaultCard.vue'
import BaseSwitchToggle from '~/components/base/BaseSwitchToggle.vue'
import { MovieModel } from '~/types/Movie'
export default Vue.extend({
  name: 'MovieCardApp',
  components: { BaseDefaultCard, BaseSwitchToggle },
  props: {
    movie: {
      type: Object as PropType<MovieModel>,
      required: true,
    },
    onToggleSwitch: {
      type: Function,
      required: false,
      default: null,
    },
  },
  computed: {
    iconReady(): IconDefinition {
      return this.$props.movie.hasFile ? faCheck : faTimes
    },
    inCinemasDate(): String {
      return this.$props.movie.inCinemas &&
        this.$props.movie.inCinemas !== 'TBA'
        ? this.$dateFns.format(
            new Date(this.$props.movie.inCinemas.toString()),
            'dd/MM/yyyy'
          )
        : 'TBA'
    },
    hasImage(): Boolean {
      return !!this.$props.movie.image
    },
  },
  methods: {
    toggleSwitch(value: Boolean) {
      this.$props.onToggleSwitch({ id: this.$props.movie.id, needSync: value })
    },
  },
})
</script>
