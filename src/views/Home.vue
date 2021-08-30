<template>
  <div class="home">
    <br>
    <div v-if="user">
      <h3>Information from vuex store</h3>
      <p>{{user.given_name}} {{user.family_name}}</p>
      <p>{{user.email}}</p>
    </div>
    <div v-if="user2">
      <h3>Information from localStorage</h3>
      <p>{{user2.given_name}} {{user2.family_name}}</p>
      <p>{{user2.email}}</p>
    </div>
    <br>
    <button v-if="authenticated" @click="logout">Logout</button>
  </div>
</template>

<script>

import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { signOut } from '@/auth'

export default {
  name: 'Home',

  setup() {
    const store = useStore()
    const user2 = ref()

    const user = computed(() => store.getters['main/user'])
    const authenticated = computed(() => store.getters['main/isAuthenticated'])

    user2.value = JSON.parse(localStorage.getItem('user'))

    async function logout() {
      await signOut()
    }

    return {
      authenticated,
      user,
      user2,
      logout
    }
  }
}

</script>
