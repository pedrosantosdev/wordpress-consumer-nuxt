<template>
	<div class="movie-page">
		<div class="mb-4 relative">
			<MovieSearchBar :input="query" @update:input="searchMovie" />
		</div>
		<transition>
			<MovieCardLoading v-if="isLoading && !hasError" />
			<BaseCardError v-else-if="!isLoading && hasError">Erro ao carregar a listagem</BaseCardError>
			<div v-else-if="searchActive" class="movie-list">
				<MovieCard
					v-for="(movie, index) in getSearchMovies"
					:key="movie.id"
					:movie="movie"
					:index="index"
					:on-toggle-switch="movie.alreadyAdd ? toggleMovie : addMovie"
				/>
			</div>
			<div v-else-if="(getMovies?.length ?? 0) > 0" class="movie-list">
				<MovieCard
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
import { useMoviesStore } from '@/app/state/movies'

const $store = useMoviesStore()
const { list: getMovies, hasError, isLoading, getSearchMovies } = storeToRefs($store)

const query = ref('')
const searchActive = ref(false)

const searchMovie = (target: Record<string, string | number | boolean>) => {
	query.value = target.value as string
	searchActive.value = (query.value.length > 0 ||
		target.isLocal ||
		target.isActive ||
		target.isReady ||
		target.recentMovies) as boolean
	if (target.isLocal || target.isActive || target.isReady || target.recentMovies) {
		$store.searchLocal(target)
	} else {
		$store.search(query.value as string)
	}
}
function toggleMovie(value: { id: number; needSync: boolean }) {
	$store.toggle(value)
}
function addMovie(value: { id: number }) {
	$store.add(value.id)
}

onMounted(() => {
	if ((getMovies?.value?.length ?? 0) === 0 && !$store.isLoading) {
		$store.get()
	}
})
</script>

<style lang="scss">
.movie-page {
	@apply px-5 pb-5 w-full min-h-screen max-h-full;
	.movie-list {
		@apply flex flex-wrap flex-row gap-4;
	}
}
</style>
