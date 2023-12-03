<template>
	<BaseCard>
		<div class="self-center text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
			Login To Your Account
		</div>
		<div class="mt-2">
			<form autoComplete="off" :class="{ error: hasError }" @submit.prevent="onSubmit">
				<div class="flex flex-col mb-2">
					<div class="flex relative flex-wrap input-group">
						<label for="username" class="prefix-input">
							<NuxtIcon name="mail" />
						</label>
						<input
							id="username"
							v-model.trim="form.username.value"
							type="text"
							name="username"
							placeholder="Your email"
						/>
						<NuxtIcon name="times" class="error--icon" />
					</div>
				</div>
				<div class="flex flex-col mb-4">
					<div class="flex relative flex-wrap input-group">
						<label for="password" class="prefix-input">
							<NuxtIcon name="unlock" />
						</label>
						<input
							id="password"
							v-model.trim="form.password.value"
							type="password"
							name="password"
							placeholder="Your password"
						/>
						<NuxtIcon name="times" class="error--icon" />
					</div>
					<p class="text-sm text-red-500 -bottom-6 w-full error--message">Invalid Credentials</p>
				</div>
				<div class="flex w-full">
					<BaseButton :disabled="isLoading" :show-icon="isLoading" @click="onSubmit"
						>Login</BaseButton
					>
				</div>
			</form>
		</div>
	</BaseCard>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/state/auth'
import { storeToRefs } from 'pinia'
import { ref, onBeforeMount } from 'vue'
import { navigateTo } from 'nuxt/app'

const authStore = useAuthStore()
const { hasError, isAuth, lastPage, isExpired } = storeToRefs(authStore)
const isLoading = ref(false)
const form = {
	username: ref(''),
	password: ref(''),
}

onBeforeMount(() => {
	if (isAuth.value && isExpired.value) {
		authStore.logout(false)
	} else if (isAuth.value) {
		goForward()
	}
})
authStore.$subscribe(() => {
	if (isAuth.value) {
		goForward()
	}
})
function goForward(): void {
	navigateTo(lastPage.value ?? '/')
}
async function onSubmit(): Promise<void> {
	const data = new FormData()
	data.append('username', form.username.value)
	data.append('password', form.password.value)
	isLoading.value = true
	await authStore.login(data)
	isLoading.value = false
}
</script>

<style lang="scss" scoped>
.error {
	&--message,
	&--icon {
		@apply opacity-0 block transition-all;
	}
	&--icon {
		top: 12px;
		right: 10px;
		@apply text-red-500 absolute;
	}
}
.input-group.input-group {
	&:focus-within {
		input,
		.prefix-input {
			@apply border-purple-600;
		}
	}
	input,
	.prefix-input {
		@apply bg-white border-gray-300 shadow-sm border outline-none border-2;
	}
	.prefix-input {
		@apply rounded-l-md inline-flex items-center px-3 border-r-0 text-gray-500 text-sm border-r-gray-300;
	}
	input {
		@apply rounded-r-md flex-1 appearance-none border-l-0 w-full py-2 px-4 text-gray-700 placeholder-gray-400 text-base border-l-gray-300;
	}
}
.error {
	.error--message,
	.error--icon {
		@apply opacity-100;
	}
	.input-group {
		input,
		.prefix-input {
			@apply border-red-500;
		}
	}
}
</style>
