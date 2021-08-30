<template>
  <div class="login">
    <img alt="Vue logo" src="../assets/logo.png">
    <br>
    <br>
    <div v-if="!authLoading">
      <button v-if="!authenticated" @click="login">Login</button>
    </div>
    <p v-if="authenticated">Redirecting to Home...</p>
  </div>
</template>

<script>

import { computed } from 'vue'
import { useStore } from 'vuex'
import { signIn } from '@/auth'
import { useRouter } from 'vue-router'

export default {
  name: 'Login',

  setup() {
    const store = useStore()
    const router = useRouter()

    const authLoading = computed(() => store.getters['main/isLoading'])
    const authenticated = computed(() => store.getters['main/isAuthenticated'])

    async function login() {
      await signIn()

      if (authenticated.value) {
        router.push({ name: 'home' })
      }
    }

    return {
      authLoading,
      authenticated,
      login
    }
  }
}

</script>
