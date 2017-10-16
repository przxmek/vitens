import * as types from '../../mutation-types'
import lazyLoading from './lazyLoading'

import statistics from './statistics'
import forms from './forms'
import dashboard from './dashboard'
import ui from './ui'
import maps from './maps'
import tables from './tables'
import sources from './sources'
import distributions from './distributions'

const state = {
  items: [dashboard, sources, distributions]
}

const mutations = {
  [types.TOGGLE_EXPAND_MENU_ITEM](state, payload) {
    let menuItem = payload.menuItem
    let expand = payload.expand
    if (menuItem.children && menuItem.meta) {
      menuItem.meta.expanded = expand
    }
  },
  loadMenu (state, assets) {
    var productionSiteItems = assetsToItems(assets.productionSites)
    var distributionSiteItems = assetsToItems(assets.distributionSites)
    state.items[1].children = productionSiteItems
    state.items[2].children = distributionSiteItems
  }
}

const actions = {
  toggleExpandMenuItem({commit}, payload) {
    commit(types.TOGGLE_EXPAND_MENU_ITEM, payload)
  },
  loadMenu({commit}, payload) {
    commit('loadMenu', payload)
  }
}

const assetsToItems = (assets) => {
  return assets.map(asset => {
    return {
      name: asset.name,
      path: '/sources/' + asset.id,
      component: lazyLoading('dashboard/Dashboard'),
      meta: {
        title: asset.name
      }
    }
  })
}



export default {
  state,
  mutations,
  actions
}
