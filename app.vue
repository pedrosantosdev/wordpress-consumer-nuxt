<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
	<VitePwaManifest />
	<NuxtLayout name="default">
		<NuxtPage />
	</NuxtLayout>
	<div
		v-show="$pwa.needRefresh"
		class="fixed w-full bottom-0 bg-white dark:bg-gray-800 dark:text-white text-black p-2 pb-6"
	>
		<span>{{ t('app.pwa.update.message') }}</span>
		<button
			class="mt-3 max-w-max px-3 py-2 block bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
			@click="$pwa.updateServiceWorker()"
		>
			{{ t('reload') }}
		</button>
	</div>
</template>

<i18n lang="json">
{
	"en": {
		"app.pwa.update.message": "New content available, click on reload button to update"
	},
	"pt-BR": {
		"app.pwa.update.message": "Atualização disponivel, aperte no botão de recarregar abaixo para atualizar"
	}
}
</i18n>
