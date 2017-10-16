import Vue from 'vue'
import Vuex from 'vuex'

import menu from './modules/menu'
import app from './modules/app'
import staticData from './modules/static'

import * as getters from './getters'

import piWebApi from './plugins/pi-web-api'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: true,  // process.env.NODE_ENV !== 'production',
  getters,
  modules: {
    menu,
    app,
    staticData
  },
  state: {},
  mutations: {},
  plugins: [ piWebApi ]
})

export default store
