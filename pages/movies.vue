<template>
  <div class="px-5 pb-5 w-full min-h-screen max-h-full">
    <div class="mb-4 relative">
      <movie-card-search-app :input="query" @update:input="searchMovie" />
    </div>
    <transition>
      <movie-card-loading v-if="isLoading && !hasError" />
      <base-card-error v-else-if="!isLoading && hasError"
        >Erro ao carregar a listagem</base-card-error
      >
      <div v-else-if="query.length" class="flex flex-wrap flex-row gap-4">
        <movie-card-app
          v-for="(movie, index) in getSearchMovies"
          :key="movie.id"
          :movie="movie"
          :index="index"
          :on-toggle-switch="movie.alreadyAdd ? toggleMovie : addMovie"
        />
      </div>
      <div
        v-else-if="(getMovies?.length ?? 0) > 0"
        class="flex flex-wrap flex-row gap-4"
      >
        <movie-card-app
          v-for="(movie, index) in getMovies ?? []"
          :key="movie.id"
          :movie="movie"
          :index="index"
          :on-toggle-switch="toggleMovie"
        />
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useMoviesStore } from '@/state/movies'

const $store = useMoviesStore()
const {
  list: getMovies,
  hasError,
  isLoading,
  getSearchMovies,
} = storeToRefs($store)

const query = ref('')

const searchMovie = (target: Record<string, string | number | boolean>) => {
  query.value = target.value as string
  if (target.isLocal || target.isActive || target.isReady) {
    $store.searchLocal(target)
  } else {
    $store.search(target.value)
  }
}
const toggleMovie = (value: { id: number; needSync: boolean }) =>
  $store.toggle(value)
const addMovie = (value: { id: number }) => $store.add(value.id)

onMounted(() => {
  if ((getMovies?.value?.length ?? 0) === 0 && !$store.isLoading) {
    $store.get()
  }
})
</script>
