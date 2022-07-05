<template>
  <base-card-default>
    <div
      class="
        self-center
        mb-6
        text-xl
        font-light
        text-gray-600
        sm:text-2xl
        dark:text-white
      "
    >
      Login To Your Account
    </div>
    <div class="mt-8">
      <form
        autoComplete="off"
        :class="{ error: hasError }"
        @submit.prevent="onSubmit"
      >
        <div class="flex flex-col mb-2">
          <div class="flex relative flex-wrap input-group">
            <span
              class="
                rounded-l-md
                inline-flex
                items-center
                px-3
                border-t
                bg-white
                border-l border-b border-gray-300
                text-gray-500
                shadow-sm
                text-sm
              "
            >
              <nuxt-icon name="mail" />
            </span>
            <input
              id="username"
              v-model.trim="form.username.value"
              type="text"
              name="username"
              class="
                rounded-r-lg
                flex-1
                appearance-none
                border border-gray-300
                w-full
                py-2
                px-4
                bg-white
                text-gray-700
                placeholder-gray-400
                shadow-sm
                text-base
                focus:outline-none
                focus:ring-2 focus:ring-purple-600
              "
              placeholder="Your email"
            />
            <nuxt-icon name="times" class="error--icon" />
          </div>
        </div>
        <div class="flex flex-col mb-6">
          <div class="flex relative flex-wrap input-group">
            <span
              class="
                rounded-l-md
                inline-flex
                items-center
                px-3
                border-t
                bg-white
                border-l border-b border-gray-300
                text-gray-500
                shadow-sm
                text-sm
              "
            >
              <nuxt-icon name="unlock" />
            </span>
            <input
              id="password"
              v-model.trim="form.password.value"
              type="password"
              name="password"
              class="
                rounded-r-lg
                flex-1
                appearance-none
                border border-gray-300
                w-full
                py-2
                px-4
                bg-white
                text-gray-700
                placeholder-gray-400
                shadow-sm
                text-base
                focus:outline-none
                focus:ring-2 focus:ring-purple-600
                focus:border-transparent
              "
              placeholder="Your password"
            />
            <nuxt-icon name="times" class="error--icon" />
          </div>
          <p class="text-sm text-red-500 -bottom-6 w-full error--message">
            Invalid Credentials
          </p>
        </div>
        <div class="flex w-full">
          <button
            type="submit"
            :disabled="isLoading"
            class="
              py-2
              px-4
              h-10
              bg-purple-600
              hover:bg-purple-700
              focus:ring-purple-500 focus:ring-offset-purple-200
              text-white
              w-full
              transition
              ease-in
              duration-200
              text-center text-base
              font-semibold
              shadow-md
              focus:outline-none
              focus:ring-2 focus:ring-offset-2
              rounded-lg
            "
          >
            <nuxt-icon v-if="isLoading" class="spinner" name="spinner" />
            <span v-else> Login </span>
          </button>
        </div>
      </form>
    </div>
  </base-card-default>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/state/auth'
import { storeToRefs } from 'pinia'

const authStore = useAuthStore()
const { isLoading, hasError, isAuth, lastPage, isExpired } =
  storeToRefs(authStore)
const form = {
  username: ref(''),
  password: ref(''),
}

onBeforeMount(() => {
  if (isExpired.value) {
    authStore.logout(false)
  } else if (isAuth.value) {
    navigateTo(lastPage.value ?? '/')
  }
})
watch(isAuth, () => {
  if (isAuth.value) {
    navigateTo(lastPage.value ?? '/')
  }
})
const onSubmit = (): void => {
  const data = new FormData()
  data.append('username', form.username.value)
  data.append('password', form.password.value)
  // Auth Nuxt 3 Alternative
  authStore.login(data)
}
</script>

<style lang="scss" scoped>
.error {
  &--message,
  &--icon {
    display: none;
  }
  &--icon {
    position: absolute;
    top: 12px;
    right: 10px;
    @apply text-red-500;
  }
}
.error {
  .error--message,
  .error--icon {
    display: block;
  }
  .input-group {
    @apply ring-red-500 ring-2 rounded-md;
  }
}
</style>
