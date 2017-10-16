import proj4 from 'proj4'
import OpenLayers from 'ol'

const store = {
  namespaced: true,
  state: {
    assets: {
      productionSites: [],
      distributionSites: []
    },
    assetsFlatMap: {},
    labels: [],
    series: []
  },
  mutations: {
    loadStatic(state, assets) {
      state.assets = assets
      assets.productionSites.forEach(asset => {
        state.assetsFlatMap[asset.id] = asset
      })
      assets.distributionSites.forEach(asset => {
        state.assetsFlatMap[asset.id] = asset
      })
    }
  },
  actions: {
    loadStatic(store, data) {
      const assets = prepareAssets(data)
      store.commit('loadStatic', assets)
      store.commit('loadMenu', assets, {root: true})
    }
  }
}

const firstProj = "+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.417,50.3319,465.552,-0.398957,0.343988,-1.8774,4.0725 +units=m +no_defs"
const secProj = "+proj=longlat +datum=WGS84 +no_defs"

const prepareAssets = (data) => {
  return {
    productionSites: parseSite(data.prod),
    distributionSites: parseSite(data.dist)
  }
}

const parseSite = (data) => {
  var items = data.Sites.Content.Items
  var attributes = data.SitesAttributes.Content.Items.map(e => e.Content.Items)

  var assets = []
  var i
  for (i=0; i<items.length; ++i) {
    var item = items[i]
    var attrs = attributes[i]

    var coords = proj4(firstProj, secProj, [attrs[1].Value.Value, attrs[0].Value.Value])

    assets.push({
      name: item.Name,
      id: item.WebId,
      lat: coords[1],
      lng: coords[0],
      links: {
        plot: item.Links.InterpolatedData + "?categoryName=Data",
        recorded: item.Links.RecordedData + "?categoryName=Data"
      }
    })
  }

  return assets;
}

export default store
