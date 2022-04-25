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
      <form autoComplete="off" @submit.prevent="onSubmit">
        <div class="flex flex-col mb-2">
          <div
            class="flex relative flex-wrap"
            :class="{ 'ring-red-500 ring-2 rounded-md': hasError }"
          >
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
              <svg
                width="15"
                height="15"
                fill="currentColor"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"
                ></path>
              </svg>
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
                focus:border-transparent
              "
              placeholder="Your email"
            />
            <span v-html="times"></span>
          </div>
        </div>
        <div class="flex flex-col mb-6">
          <div
            class="flex relative flex-wrap"
            :class="{ 'ring-red-500 ring-2 rounded-md': hasError }"
          >
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
              <svg
                width="15"
                height="15"
                fill="currentColor"
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"
                ></path>
              </svg>
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
            <span v-html="times"></span>
          </div>
          <p
            class="text-sm text-red-500 -bottom-6 w-full"
            :class="{ hidden: !hasError }"
          >
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
            <div v-if="isLoading" class="spinner" v-html="iconSpinner"></div>
            <span v-else> Login </span>
          </button>
        </div>
      </form>
    </div>
  </base-card-default>
</template>

<script setup lang="ts">
import { times, spinner } from '@/helpers/icons'
const route = useRoute()
const router = useRouter()
const isLoading = ref(false)
const hasError = ref(false)
const form = {
  username: ref(''),
  password: ref(''),
}
const iconSpinner = spinner
const onSubmit = (): void => {
  if (isLoading.value) {
    return
  }
  if (form.username.value === '' || form.password.value === '') {
    hasError.value = true
    return
  }
  hasError.value = false
  isLoading.value = true
  const data = new FormData()
  data.append('username', form.username.value)
  data.append('password', form.password.value)
  // Auth Nuxt 3 Alternative
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  new Promise(() => {})
    .then(() => {
      useBaseAuth().setUser({ name: form.username.value })
      router.push({
        name: route?.query?.lastpage?.toString() ?? 'index',
      })
    })
    .catch(() => {
      hasError.value = true
      isLoading.value = false
    })
  // Auth Nuxt 3 Not ready
  // this.$auth
  //   .loginWith('local', { data })
  //   .then(() => {
  //     router.push({
  //       name: route?.query?.lastpage?.toString() ?? 'index',
  //     })
  //   })
  //   .catch(() => {
  //     hasError.value = true
  //     isLoading.value = false
  //   })
}
</script>
