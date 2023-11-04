<template>
	<VitePwaManifest />
	<NuxtLayout name="default">
		<NuxtPage />
	</NuxtLayout>
	<div v-show="$pwa.needRefresh">
		<span> New content available, click on reload button to update. </span>
		<button @click="$pwa.updateServiceWorker()">Reload</button>
	</div>
</template>
