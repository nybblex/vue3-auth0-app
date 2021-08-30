import * as types from './mutation-types'

const state = () => {
  return {
    user: null,
    auth: {
      client: null,
      isLoading: false,
      isAuthenticated: false
    }
  }
}

// getters
const getters = {
  user: state => state.user,
  authClient: state => state.auth.client,
  isAuthenticated: state => !!state.user,
  isLoading: state => state.auth.isLoading
}

// actions
const actions = {
  setUser({ commit }, user) {
    commit(types.SET_USER, { user })
  },
  setAuthLoadingStatus({ commit }, isLoading) {
    commit(types.SET_AUTH_LOADING_SATUS, { isLoading })
  },
  setUserAuthenticated({ commit }, isAuthenticated) {
    commit(types.SET_AUTH_AUTHENTICATED, { isAuthenticated })
  },
  setAuthClient({ commit }, client) {
    commit(types.SET_AUTH_CLIENT, { client })
  }
}

// mutations
const mutations = {
  [types.SET_USER](state, { user }) {
    state.user = user
  },
  [types.SET_AUTH_LOADING_SATUS](state, { status }) {
    state.auth.isLoading = status
  },
  [types.SET_AUTH_AUTHENTICATED](state, { status }) {
    state.auth.isAuthenticated = status
  },
  [types.SET_AUTH_CLIENT](state, { client }) {
    state.auth.client = client
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
