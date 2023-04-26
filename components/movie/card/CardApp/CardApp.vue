<template>
	<BaseCardDefault>
		<div class="h-52 sm:h-full lg:w-1/3 w-full">
			<img
				v-if="hasImage"
				loading="lazy"
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
				<div class="w-10 h-8 text-2xl dark:text-white text-black">
					<NuxtIcon v-if="movie.hasFile" name="check" />
					<NuxtIcon v-else name="times" />
				</div>
				<div class="w-14 h-8 ml-auto">
					<BaseSwitchToggle
						:id="`${movie.id}-sw`"
						:key="`${movie.id}-sw`"
						:default-state="movie.needSync"
						@toggle="toggleSwitch"
					/>
				</div>
			</div>
		</div>
	</BaseCardDefault>
</template>

<script setup lang="ts">
import BaseCardDefault from '@/components/base/CardDefault/CardDefault.vue'
import BaseSwitchToggle from '@/components/base/SwitchToggle/SwitchToggle.vue'
import { MovieModel } from '@/types/Movie'

const props = withDefaults(
	defineProps<{
		movie: MovieModel
		// eslint-disable-next-line @typescript-eslint/no-explicit-any, vue/require-default-prop
		onToggleSwitch?: (model: { id: number; needSync: boolean }) => any
	}>(),
	{}
)
const date =
	props.movie.inCinemas && props.movie.inCinemas !== 'TBA' ? new Date(props.movie.inCinemas) : null
const hasImage = !!props.movie.image
const inCinemasDate = date ? `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}` : 'TBA'

const toggleSwitch = (value: boolean) =>
	props.onToggleSwitch ? props.onToggleSwitch({ id: props.movie.id, needSync: value }) : null
</script>
