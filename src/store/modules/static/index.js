const store = {
  namespaced: true,
  state: {
    assets: {

    },
    labels: [],
    series: []
  },
  mutations: {
    loadStatic(state, assets) {
      state.assets = assets
    }
  },
  actions: {
    loadStatic(store, data) {
      const assets = prepareAssets(data)
      store.commit('loadStatic', assets)
      store.commit('loadMenu', assets, { root: true })
    }
  }
}

const prepareAssets = (data) => {
  var items = data.ProductionSites.Content.Items
  var attributes = data.ProductionSitesAttributes.Content.Items.map(e => e.Content.Items)

  var assets = []
  var i
  for (i=0; i<items.length; ++i) {
    var item = items[i]
    var attrs = attributes[i]
    assets.push({
      name: item.Name,
      lat: 0.0,
      lng: 0.0
    })
  }

  return assets;
}

export default store
