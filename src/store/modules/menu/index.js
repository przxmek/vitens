import * as types from '../../mutation-types'
import lazyLoading from './lazyLoading'

import statistics from './statistics'
import forms from './forms'
import dashboard from './dashboard'
import ui from './ui'
import maps from './maps'
import tables from './tables'
import sources from './sources'

const state = {
  items: [dashboard]
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
    var items = assetsToItems(assets)
    console.log(items)
    state.items = state.items.concat(items)
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
  console.log(assets)
  return assets.map(asset => {
    return {
      name: asset.name,
      path: '/sources',
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
