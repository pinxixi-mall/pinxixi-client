import { InjectionKey } from 'vue'
import { Store, createStore } from 'vuex'

export interface State {
  loading: Boolean
  loadingText: String
}

const key: InjectionKey<Store<State>> = Symbol()

const store = createStore<State>({
  state: {
    loading: false,
    loadingText: '加载中...'
  },
  mutations: {
    handleLoading(state, { loading, loadingText = '加载中...' }) {
      state.loading = loading
      state.loadingText = loadingText
    }
  },
  getters: {
    loading: (state) => state.loading,
    loadingText: (state) => state.loadingText
  }
})

export { store, key }
