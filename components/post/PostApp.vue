<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { usePostsStore } from '@/state/posts'

const postsStores = usePostsStore()
const {
  list: posts,
  isLoading,
  searchList: searchResults,
  isLoadingSearch,
} = storeToRefs(postsStores)

const showModal = ref(false)

const closeModalEvent = () => {
  showModal.value = false
}

const query = ref('')
const clearQuery = () => (query.value = '')
const submitQuery = () => postsStores.search(query.value)

let page = 1

const loadMore = () => {
  ++page
  postsStores.get(page)
}

const onPostClick = (id: number) => {
  navigateTo(`posts/${id}`)
}

onBeforeMount(() => {
  if (!isLoading.value && (posts?.value?.length ?? 0) === 0) {
    postsStores.get()
  }
})
</script>

<template>
  <div class="posts-page self-start w-full px-5 pb-3">
    <BaseModal :show-modal="showModal" @close="closeModalEvent">
      <PostDomainFormApp />
    </BaseModal>
    <div class="flex gap-2 items-center relative mb-4">
      <BaseInput v-model="query" @enter="submitQuery" />
      <NuxtIcon
        name="times"
        class="cursor-pointer absolute text-black right-10"
        @click="clearQuery"
      />
      <NuxtIcon name="gears" class="cursor-pointer" @click="showModal = true" />
    </div>
    <transition
      enter-active-class="transition ease-out duration-200 transform"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200 transform"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
      name="posts-list"
    >
      <div v-if="!isLoadingSearch && query != ''" class="posts-list">
        <PostCard
          v-for="post in searchResults?.results ?? []"
          :key="post.id"
          :post="post"
          @click="onPostClick(post.id)"
        />
      </div>
      <div v-else-if="!isLoadingSearch" class="posts-list">
        <PostCard
          v-for="post in posts"
          :key="post.id"
          class="transition-all"
          :post="post"
          @click="onPostClick(post.id)"
        />
      </div>
    </transition>

    <button
      v-show="!isLoading && query == ''"
      class="w-2/4 mx-auto mt-4 text-center p-5 border border-black"
      @click="loadMore"
    >
      Ver Mais
    </button>
    <NuxtIcon
      v-show="isLoading || isLoadingSearch"
      class="w-2/4 mx-auto mt-4 spinner"
      name="spinner"
    />
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/abstract/mixins.scss';
.posts-page {
  .posts-list {
    gap: 20px;
    justify-content: space-evenly;
    @include grid-auto-columns(24rem);
  }
}
</style>
