import Vue from 'vue'
import Vuex from 'vuex'
import rootGetters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

let install = null
Vue.use(Vuex)
export default function setStore({ getters, modules } = {}) {
  if (!install) {
    const newGetters = { ...rootGetters, ...getters }
    const store = new Vuex.Store({
      modules: {
        app,
        settings,
        user,
        ...modules
      },
      getters: newGetters
    })
    install = store
  }
  return install
}
