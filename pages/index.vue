<template>
  <div class="p-10 flex flex-wrap flex-row gap-4">
    <base-switch-toggle id="10s" :on-toggle-switch="print"/>
    <base-error-card />
    <movie-card-loading-app />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseErrorCard from '~/components/base/card/BaseErrorCard.vue'
import BaseSwitchToggle from '~/components/base/BaseSwitchToggle.vue'
import MovieCardLoadingApp from '~/components/movie/MovieCardLoadingApp.vue'

export default Vue.extend({
  name: 'IndexPage',
  components: { BaseErrorCard, BaseSwitchToggle, MovieCardLoadingApp },
  methods: {
    print(v: Boolean) {
      // eslint-disable-next-line no-console
      console.log(v)
    }
  }
})
</script>
