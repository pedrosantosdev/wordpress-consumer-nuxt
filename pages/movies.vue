<template>
  <div class="px-10 pb-5 w-full min-h-screen max-h-full">
    <div class="mb-4 relative">
      <input
        v-model="query"
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
        "
        type="text"
        @input="debouncedHandler"
        @keydown.enter="searchMovie"
      />
      <div
        class="absolute top-0 right-0 cursor-pointer py-2 px-4"
        @click.prevent="clearQuery"
      >
        <fa-icon :icon="inputIcon" class="text-black" />
      </div>
    </div>
    <transition>
      <movie-card-loading v-if="isLoading && !hasError" />
      <base-card-error v-else-if="!isLoading && hasError"
        >Erro ao carregar a listagem</base-card-error
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

<script setup lang="ts">
import { times } from '@/helpers/icons'
import { debounce } from '@/helpers/utils'
import { storeToRefs } from 'pinia'
import { useMoviesStore } from '~~/state/movies'

const $store = useMoviesStore()
const {
  getMoviesList: getMovies,
  getSearchMoviesList: getSearchMovies,
  hasError,
  isLoading,
} = storeToRefs($store)

const query = ref('')
let debouncedHandler = debounce()

const inputIcon = computed(() => times)

const clearQuery = () => {
  query.value = ''
  $store.query = ''
}

const searchMovie = () => $store.search(query.value)
const toggleMovie = (value: { id: Number; needSync: Boolean }) =>
  $store.toggle(value)
const addMovie = (value: { id: Number }) => $store.add(value.id)

onBeforeMount(() => {
  debouncedHandler = debounce(() => {
    $store.search(query.value)
  }, 500)
})
onMounted(() => {
  if ((getMovies.value?.length ?? 0) === 0 && !$store.isLoading) {
    $store.get()
  }
})
</script>
