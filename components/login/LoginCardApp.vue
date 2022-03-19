<template>
  <base-default-card>
    <div
      class="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white"
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
              class="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm"
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
              v-model.trim="form.username"
              type="text"
              name="username"
              class="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Your email"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="currentColor"
              class="text-red-500 right-2 bottom-3"
              :class="{ absolute: hasError, hidden: !hasError }"
              viewBox="0 0 1792 1792"
            >
              <path
                d="M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z"
              ></path>
            </svg>
          </div>
        </div>
        <div class="flex flex-col mb-6">
          <div
            class="flex relative flex-wrap"
            :class="{ 'ring-red-500 ring-2 rounded-md': hasError }"
          >
            <span
              class="rounded-l-md inline-flex items-center px-3 border-t bg-white border-l border-b border-gray-300 text-gray-500 shadow-sm text-sm"
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
              v-model.trim="form.password"
              type="password"
              name="password"
              class="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              placeholder="Your password"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="currentColor"
              class="text-red-500 right-2 bottom-3"
              :class="{ absolute: hasError, hidden: !hasError }"
              viewBox="0 0 1792 1792"
            >
              <path
                d="M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z"
              ></path>
            </svg>
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
            class="py-2 px-4 bg-purple-600 hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          >
            <fa-icon v-if="isLoading" :icon="iconSpinner" class="spinner" />
            <span v-else> Login </span>
          </button>
        </div>
      </form>
    </div>
  </base-default-card>
</template>

<script lang="ts">
import { faSpinner, IconDefinition } from '@fortawesome/free-solid-svg-icons'
import Vue from 'vue'
import BaseDefaultCard from '~/components/base/card/BaseDefaultCard.vue'
export default Vue.extend({
  name: 'LoginCardApp',
  components: { BaseDefaultCard },
  data() {
    return {
      isLoading: false,
      hasError: false,
      form: {
        username: '',
        password: '',
      },
    }
  },
  computed: {
    iconSpinner(): IconDefinition {
      return faSpinner
    },
  },
  methods: {
    onSubmit(): void {
      if (this.isLoading) {
        return
      }
      if (this.$data.form.username === '' || this.$data.form.password === '') {
        this.hasError = true
        return
      }
      this.hasError = false
      this.isLoading = true
      const data = new FormData()
      data.append('username', this.$data.form.username)
      data.append('password', this.$data.form.password)
      this.$auth
        .loginWith('local', { data })
        .then(() => {
          this.$router.push({
            name: this.$route?.query?.lastpage?.toString() ?? 'index',
          })
        })
        .catch(() => {
          this.hasError = true
          this.isLoading = false
        })
    },
  },
})
</script>
