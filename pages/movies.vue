<template>
  <div class="p-10">
    <div class="mb-4">
      <input
        v-model="query"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        @input="debouncedHandler"
        @keydown.enter="searchMovie"
      />
    </div>
    <transition>
      <movie-card-loading-app v-if="isLoading && !hasError" />
      <base-error-card v-else-if="!isLoading && hasError"
        >Erro ao carregar a listagem</base-error-card
      >
      <div v-else-if="query.length" class="flex flex-wrap flex-row gap-4">
        <movie-card-app
          v-for="movie in getSearchMovies"
          :key="movie.id"
          :movie="movie"
          :on-toggle-switch="addMovie"
        />
      </div>
      <div v-else class="flex flex-wrap flex-row gap-4">
        <movie-card-app
          v-for="movie in getMovies"
          :key="movie.id"
          :movie="movie"
          :on-toggle-switch="toggleMovie"
        />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { debounce } from '@/helpers/utils'
import BaseErrorCard from '~/components/base/card/BaseErrorCard.vue'
import MovieCardApp from '~/components/movie/MovieCardApp.vue'
import MovieCardLoadingApp from '~/components/movie/MovieCardLoadingApp.vue'

export default Vue.extend({
  name: 'MoviesPage',
  components: { MovieCardLoadingApp, MovieCardApp, BaseErrorCard },
  data() {
    return {
      query: '',
      debouncedHandler: null,
    }
  },
  computed: {
    getMovies() {
      return this.$store.state.movies.list
    },
    getSearchMovies() {
      return this.$store.state.movies.queryResultList
    },
    isLoading() {
      return this.$store.state.movies.isLoading
    },
    hasError() {
      return this.$store.state.movies.hasError
    },
  },
  beforeMount() {
    if ((this.$store.state.movies.list?.length ?? 0) === 0) {
      this.$store.dispatch('movies/get')
    }
  },
  created() {
    this.$data.debouncedHandler = debounce(() => {
      this.$store.dispatch('movies/search', this.$data.query)
    }, 500)
  },
  methods: {
    searchMovie() {
      this.$store.dispatch('movies/search', this.$data.query)
    },
    toggleMovie(value: { id: Number, needSync: Boolean }) {
      this.$store.dispatch('movies/toggle', value)
    },
    addMovie(value: { id: Number }) {
      this.$store.dispatch('movies/add', value.id)
    }
  },
})
</script>
