import { createStore } from 'vuex'


export default createStore({
  state: {
    user: null,
    auth: {
      isLoading: false,
      isAuthenticated: false
    }
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },

    SET_AUTH_LOADING_SATUS(state, status) {
      state.auth.isLoading = status;
    },

    SET_AUTH_AUTHENTICATED(state, status) {
      state.auth.isAuthenticated = status;
    }

  },
  getters: {
    authenticated(state) {
      return !!state.user;
    }
  },
  actions: {

    setUser({commit}, user) {
      commit('SET_USER', user);
    },

    setAuthLoadingStatus({commit}, isLoading) {
      commit('SET_AUTH_LOADING_SATUS', isLoading);
    },

    setUserAuthenticated({commit}, isAuthenticated) {
      commit('SET_AUTH_AUTHENTICATED', isAuthenticated);
    }

  },
  modules: {
  }
})
