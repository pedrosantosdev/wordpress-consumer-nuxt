<template>
	<VitePwaManifest />
	<NuxtLayout name="default">
		<NuxtPage />
	</NuxtLayout>
	<div
		v-show="$pwa.needRefresh"
		class="fixed w-full bottom-0 bg-white dark:bg-gray-800 dark:text-white text-black p-2 pb-6"
	>
		<span> New content available, click on reload button to update. </span>
		<button
			class="mt-3 max-w-max px-3 py-2 block bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
			@click="$pwa.updateServiceWorker()"
		>
			Reload
		</button>
	</div>
</template>
