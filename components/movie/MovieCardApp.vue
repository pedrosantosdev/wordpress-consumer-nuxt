<template>
  <base-default-card>
    <div className="h-52 sm:h-full lg:w-1/3 w-full">
      <img
        v-if="movie.image.length > 0"
        className="max-h-full mx-auto"
        :src="movie.image"
        :alt="movie.title"
      />
    </div>
    <div className="flex flex-col lg:w-2/3 w-full flex-1 gap-5 sm:p-2">
      <div className="flex flex-1 flex-col gap-3">
        <div className="w-full max-h-14 overflow-ellipsis">
          <h2>{{ movie.title }}</h2>
        </div>
        <div className="w-full min-h-3 max-h-20 line-clamp-3">
          {{ movie.overview }}
        </div>
      </div>
      <div className="mt-auto flex gap-3">
        <div className="w-24 h-8">
          {{ inCinemasDate }}
        </div>
        <div className="w-10 h-8">
          <fa :icon="iconReady" />
        </div>
        <div className="w-14 h-8 ml-auto">
          <base-switch-toggle
            :id="`${movie.id}-sw`"
            :key="`${movie.id}-sw`"
            :value="movie.needSync"
            :on-toggle-switch="onChangeCallback"
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
  },
  computed: {
    iconReady(): IconDefinition {
      return this.$props.movie.hasFile ? faCheck : faTimes
    },
    inCinemasDate(): String {
      return this.$props.movie.inCinemas && this.$props.movie.inCinemas !== 'TBA'
        ? this.$dateFns.format(new Date(this.$props.movie.inCinemas.toString()), 'dd/MM/yyyy')
        : 'TBA'
    },
  },
})
</script>
