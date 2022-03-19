<template>
  <div class="p-10">
    <transition>
      <movie-card-loading-app v-if="isLoading && !hasError" />
      <base-error-card v-else-if="!isLoading && hasError"
        >Erro ao carregar a listagem</base-error-card
      >
      <div v-else class="flex flex-wrap flex-row gap-4">
        <movie-card-app
          v-for="movie in getMovies"
          :key="movie.id"
          :movie="movie"
          :on-toggle-switch="print"
        />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseErrorCard from '~/components/base/card/BaseErrorCard.vue'
import MovieCardApp from '~/components/movie/MovieCardApp.vue'
import MovieCardLoadingApp from '~/components/movie/MovieCardLoadingApp.vue'

export default Vue.extend({
  name: 'MoviesPage',
  components: { MovieCardLoadingApp, MovieCardApp, BaseErrorCard },
  computed: {
    getMovies() {
      return this.$store.state.movies.list
    },
    isLoading() {
      return this.$store.state.movies.isLoading
    },
    hasError() {
      return this.$store.state.movies.hasError
    },
  },
  beforeMount() {
    this.$store.dispatch('movies/get')
  },
  methods: {
    print(v: Boolean) {
      // eslint-disable-next-line no-console
      console.log(v)
    },
  },
})
</script>
