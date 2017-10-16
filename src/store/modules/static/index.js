import proj4 from 'proj4'
import axios from 'axios'

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
    },
    updateRealtime (state, data) {
      if (!state.assetsFlatMap.hasOwnProperty(data.webId)) {
        state.assetsFlatMap[data.webId] = []
      }
      state.assetsFlatMap[data.webId].push({timestamp: data.timestamp, value: data.value})
      state.assetsFlatMap[data.webId] = state.assetsFlatMap[data.webId].splice(-100)
    }
  },
  actions: {
    loadStatic(store, data) {
      const assets = prepareAssets(store, data)
      store.commit('loadStatic', assets)
      store.commit('loadMenu', assets, {root: true})
    },
    updateRealtime(store, realtimeData) {
      store.commit('updateRealtime', realtimeData)
    }
  }
}

const firstProj = "+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.417,50.3319,465.552,-0.398957,0.343988,-1.8774,4.0725 +units=m +no_defs"
const secProj = "+proj=longlat +datum=WGS84 +no_defs"

const prepareAssets = (store, data) => {
  let prodSite = parseSite(data.prod)
  let distSite = parseSite(data.dist)

  for (let prod of prodSite) {
    startRealtimeDataProd(store, prod)
  }

  return {
    productionSites: prodSite,
    distributionSites: distSite
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

    let asset = {
      name: item.Name,
      id: item.WebId,
      lat: coords[1],
      lng: coords[0],
      path: item.Path,
      kpi: {
        'totalFlow': {
          name: 'Total flow',
          value: 1497.69,
          previous: null,
          uom: ''
        },
        'conductivity': {
          name: 'Conductivity',
          value: 512,
          previous: 500,
          uom: 'μS/cm'
        },
        'acidity':
          {
            name: 'Acidity (pH)',
            value: 7.71,
            previous: 7.80,
            uom: ''
          },
        'turbidity': {
          name: 'Turbidity',
          value: 0.17,
          previous: 0.17,
          uom: 'NTU'
        }
      },
      links: {
        plot: item.Links.InterpolatedData + "?categoryName=Data",
        recorded: item.Links.RecordedData + "?categoryName=Data"
      }
    }

    assets.push(asset)
  }

  return assets;
}

const startRealtimeDataProd = async (store, asset) => {
  let qualityElementUrl =  'https://saturn039.osiproghack.int/piwebapi/elements/?path=' + asset.path + "\\Distribution\\Quality"
  let qualityElement = (await axios.get(qualityElementUrl)).data
  let wsUrl = "wss://saturn039.osiproghack.int/piwebapi/streamsets/" + qualityElement.WebId + "/channel"

  let ws = new WebSocket(wsUrl)
  ws.onmessage = function(msg) {
    let json = JSON.parse(msg.data)
    for (let item of json.Items) {
      let webId = item.WebId
      for (let itemValue of item.Items) {
        let value = null
        let timestamp = itemValue.Timestamp
        if (itemValue.Good === true) {
          value = itemValue.Value.toFixed(2)
        }

        store.dispatch('updateRealtime', {webId, value, timestamp})
      }
    }
  }
}

export default store
