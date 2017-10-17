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
        state.assetsFlatMap[data.webId] = {value: '-', last: null, data: []}
      }
      let a = state.assetsFlatMap[data.webId]
      a.last = a.value
      a.value = data.value
      a.data.push({timestamp: data.timestamp, value: data.value})
      a.data = a.data.splice(-100)
    }
  },
  actions: {
    loadStatic(store, data) {
      prepareAssets(store, data).then(assets => {
        store.commit('loadStatic', assets)
        store.commit('loadMenu', assets, {root: true})
      })
    },
    updateRealtime(store, realtimeData) {
      store.commit('updateRealtime', realtimeData)
    }
  }
}

const firstProj = "+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +y_0=463000 +ellps=bessel +towgs84=565.417,50.3319,465.552,-0.398957,0.343988,-1.8774,4.0725 +units=m +no_defs"
const secProj = "+proj=longlat +datum=WGS84 +no_defs"

const prepareAssets = async (store, data) => {
  let prodSite = await parseProdSites(store, data.prod)
  let distSite = parseSites(data.dist)

  return {
    productionSites: prodSite,
    distributionSites: distSite
  }
}

const parseProdSites = async (store, data) => {
  let prodSite = parseSites(data)

  for (let prod of prodSite) {
    await startRealtimeDataProd(store, prod)
  }

  return prodSite
}

const parseSites = (data) => {
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
      attributes: {
        'totalFlow': {
          webId: '',
          name: 'Total Flow',
          data: {
            value: '-',
            last: null,
            data: []
          },
          uom: ''
        },
        'conductivity': {
          webId: '',
          name: 'Conductivity',data: {
            value: '-',
            last: null,
            data: []
          },
          uom: 'μS/cm'
        },
        'acidity':
          {
            webId: '',
            name: 'Acidity (pH)',data: {
            value: '-',
            last: null,
            data: []
          },
            uom: ''
          },
        'turbidity': {
          webId: '',
          name: 'Turbidity',data: {
            value: '-',
            last: null,
            data: []
          },
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
  let flowAttrUrl =  'https://saturn039.osiproghack.int/piwebapi/attributes/?path=' + asset.path + "|Total Flow"
  let qualityElementUrl =  'https://saturn039.osiproghack.int/piwebapi/elements/?path=' + asset.path + "\\Distribution\\Quality"
  let totalFlowAttribute = (await axios.get(flowAttrUrl)).data
  let qualityElement = (await axios.get(qualityElementUrl)).data
  let qualityAttributes = (await axios.get(qualityElement.Links.Attributes)).data.Items
  qualityAttributes.push(totalFlowAttribute)
  for (let a in asset.attributes) {
    let attr = asset.attributes[a]
    // let value = (await axios.get(attr.Link))
    let a2 = getAttrByDesc(qualityAttributes, attr.name);
    if (attr === null || a2 === null)
      continue
    let vals = (await axios.get(a2.Links.RecordedData)).data.Items
    attr.webId = a2.WebId
    for (let v of vals) {
      if (!v || v.Good !== true)
        continue
      store.dispatch('updateRealtime', {webId: attr.webId, value: v.Value.toFixed(2), timestamp: v.Timestamp})
    }
    attr.data = store.state.assetsFlatMap[attr.webId]
  }

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

const getAttrByDesc = (attributes, desc) => {
  for (let attr of attributes) {
    if (attr.Description === desc || attr.Name === desc)
      return attr
  }
  return null
}

export default store
