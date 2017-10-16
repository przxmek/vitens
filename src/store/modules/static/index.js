const store = {
  namespaced: true,
  state: {
    assets: {
      test: 'asdf'
    },
    labels: [],
    series: []
  },
  mutations: {
    loadStatic(state, data) {
      const items = data.data.Items[0].Items
      state.series = items.map(e => e.Value)
      state.labels = items.map(e => e.Timestamp)
    }
  },
  actions: {
    loadStatic(store, data) {
      store.commit('loadStatic', data)
    }
  }
}

export default store
