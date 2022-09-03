<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { usePostsStore } from '@/state/posts'
import { isNotEmpty } from '@/helpers/string'

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
  if (isLoading.value) return
  ++page
  postsStores.get(page)
}

const onPostClick = (id: number) => {
  navigateTo(`posts/${id}`)
}

const debug = () => console.log('s')

onBeforeMount(() => {
  if (!isLoading.value && (posts?.value?.length ?? 0) === 0) {
    postsStores.get()
  }
})
</script>

<template>
  <div class="posts-page self-start w-full px-5 pb-3">
    <BaseModal :show-modal="showModal" @close="closeModalEvent">
      <PostDomainFormApp class="-m-8 py-8 px-4" />
    </BaseModal>
    <div class="flex w-full gap-2 items-center relative mb-4">
      <BaseInput v-model="query" @enter="submitQuery" />
      <NuxtIcon
        name="times"
        class="cursor-pointer absolute text-black right-10"
        @click="clearQuery"
      />
      <NuxtIcon name="gears" class="cursor-pointer" @click="showModal = true" />
    </div>
    <transition name="posts-list">
      <div v-if="!isLoadingSearch && isNotEmpty(query)" class="posts-list">
        <PostCard
          v-for="post in searchResults?.results ?? []"
          :key="post.id"
          :post="post"
          @click="onPostClick(post.id)"
        />
      </div>
      <div
        v-else-if="!isLoadingSearch && !isNotEmpty(query)"
        class="posts-list"
      >
        <PostCard
          v-for="post in posts"
          :key="post.id"
          :post="post"
          @click="onPostClick(post.id)"
        />
      </div>
    </transition>

    <button
      v-show="!isLoading && !isNotEmpty(query)"
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
  @apply flex justify-center items-center w-full flex-row flex-wrap;
  .posts-list {
    @apply w-full;
    gap: 20px;
    justify-content: space-evenly;
    @include grid-auto-columns(24rem);
  }
}
</style>
