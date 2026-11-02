<template>
	<BaseCard>
		<div class="self-center text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
			{{ t('form.title') }}
		</div>
		<div class="mt-2">
			<form novalidate :class="{ error: hasError }" @submit.prevent="onSubmit">
				<div class="flex flex-col mb-2">
					<div class="flex relative flex-wrap input-group">
						<label for="username" class="prefix-input">
							<NuxtIcon name="mail" />
						</label>
						<input
							id="username"
							v-model="username"
							type="text"
							name="username"
							autocomplete="username"
							autocapitalize="none"
							autocorrect="off"
							spellcheck="false"
							maxlength="254"
							required
							aria-required="true"
							:aria-invalid="hasError"
							aria-describedby="login-error"
							:placeholder="t('form.placeholder.email')"
						>
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
							v-model="password"
							type="password"
							name="password"
							autocomplete="current-password"
							maxlength="1024"
							required
							aria-required="true"
							:aria-invalid="hasError"
							aria-describedby="login-error"
							:placeholder="t('form.placeholder.password')"
						>
						<NuxtIcon name="times" class="error--icon" />
					</div>
					<p
						id="login-error"
						role="alert"
						aria-live="assertive"
						aria-atomic="true"
						class="text-sm text-red-500 -bottom-6 w-full error--message"
					>
						{{ errorMessage }}
					</p>
				</div>
				<div class="flex w-full">
					<BaseButton
						:disabled="isLoading || isLoginLocked"
						:show-icon="isLoading"
						@click="onSubmit"
					>{{
						t('form.submit.button')
					}}</BaseButton>
				</div>
			</form>
		</div>
	</BaseCard>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { sanitizePassword, sanitizeUsername } from '@/helpers/string'
import { storeToRefs } from 'pinia'
import { ref, computed, watch, onBeforeMount, onBeforeUnmount } from 'vue'
import { navigateTo } from 'nuxt/app'
import { useI18n } from 'vue-i18n'

const authStore = useAuthStore()
const { hasError, isAuth, lastPage, isExpired, loginLockedUntil } = storeToRefs(authStore)
const isLoading = ref(false)
const now = ref(Date.now())
const form = {
	username: ref(''),
	password: ref(''),
}
const username = computed({
	get: () => form.username.value,
	set: (value: string) => {
		form.username.value = sanitizeUsername(value)
	},
})
const password = computed({
	get: () => form.password.value,
	set: (value: string) => {
		form.password.value = sanitizePassword(value)
	},
})

let lockoutTimer: ReturnType<typeof setInterval> | undefined

const { t } = useI18n({
	useScope: 'local',
})

const lockoutRemaining = computed(() => {
	if (loginLockedUntil.value === null) {
		return 0
	}
	return Math.max(0, Math.ceil((loginLockedUntil.value - now.value) / 1000))
})
const isLoginLocked = computed(() => lockoutRemaining.value > 0)
const errorMessage = computed(() => {
	if (!hasError.value) {
		return ''
	}
	switch (authStore.error.code) {
		case 'too_many_attempts':
			return t('form.lockout.message', { seconds: lockoutRemaining.value })
		case 'empty_fields':
			return t('form.required.message')
		default:
			return t('form.invalid.message')
	}
})

function stopLockoutTimer(): void {
	if (lockoutTimer !== undefined) {
		clearInterval(lockoutTimer)
		lockoutTimer = undefined
	}
}

watch(
	isLoginLocked,
	(locked) => {
		if (locked && lockoutTimer === undefined) {
			lockoutTimer = setInterval(() => {
				now.value = Date.now()
			}, 1000)
		} else if (!locked) {
			stopLockoutTimer()
			if (authStore.error.code === 'too_many_attempts') {
				authStore.setError()
			}
		}
	},
	{ immediate: true },
)
onBeforeUnmount(stopLockoutTimer)

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
	if (isLoading.value || isLoginLocked.value) {
		return
	}
	const data = new FormData()
	data.append('username', sanitizeUsername(form.username.value))
	data.append('password', sanitizePassword(form.password.value))
	isLoading.value = true
	try {
		await authStore.login(data)
		if (['invalid_credentials', 'too_many_attempts'].includes(authStore.error.code ?? '')) {
			form.password.value = ''
		}
	} finally {
		isLoading.value = false
		now.value = Date.now()
	}
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

<i18n lang="json">
{
	"en": {
		"form.title": "Login To Your Account",
		"form.placeholder.email": "Your email",
		"form.placeholder.password": "Your password",
		"form.invalid.message": "Invalid username or password",
		"form.required.message": "Please enter your username and password",
		"form.lockout.message": "Too many failed attempts. Try again in {seconds}s",
		"form.submit.button": "Login"
	},
	"pt-BR": {
		"form.title": "Entre com seu acesso",
		"form.placeholder.email": "Email",
		"form.placeholder.password": "Senha",
		"form.invalid.message": "Usuário ou senha inválidos",
		"form.required.message": "Informe seu usuário e senha",
		"form.lockout.message": "Muitas tentativas. Tente novamente em {seconds}s",
		"form.submit.button": "Entrar"
	}
}
</i18n>
