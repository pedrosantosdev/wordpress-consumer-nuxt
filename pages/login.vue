<template>
  <login-card-app />
</template>

<script lang="ts">
import Vue from 'vue'
import LoginCardApp from '~/components/login/LoginCardApp.vue'

export default Vue.extend({
  auth: false,
  name: 'LoginPage',
  components: { LoginCardApp },
})
</script>
