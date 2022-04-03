<template>
  <div class="main-content">
    <base-nav-bar />
    <Nuxt />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseNavBar from '~/components/base/BaseNavBar.vue'

export default Vue.extend({
  name: 'LayoutDefault',
  components: { BaseNavBar },
})
</script>
