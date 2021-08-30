import { createStore } from 'vuex'
import main from './main'

const store = createStore({
  modules: {
    main
  }
})

export function useStore() {
  return store
}

export default store
