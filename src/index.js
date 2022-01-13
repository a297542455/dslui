
/* Layout */
import Router from 'vue-router'
import Vuex from 'vuex'

// import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import getRouter from './router'
import setStore from './store'
import Layout from './layout'
import sduqMethod from './mixin/sduqMethod'

import { importComponents, createRoutes, createNativeRoutes } from './utils/autoImport'
import { getMenuList, getUsername } from './utils/auth'

const components = importComponents(require.context('./components', true, /\.vue/))

let _Vue
export default function install(Vue, options = { isUIonly: false }) {
  if (install.installed && _Vue === Vue) return
  install.installed = true
  const { isUIonly } = options
  if (!isUIonly) {
    Vue.use(Router)
    Vue.use(Vuex)
  }

  // Vue.use(ElementUI)
  Vue.prototype.sduqMethod = sduqMethod
  components.forEach(element => {
    Vue.component(element.name, { ...element })
  })
}

const initRouters = function(arr) {
  if (arr && arr.length > 0) {
    const contexts = importComponents(arr)
    const menuList = getMenuList()
    const routes = getUsername() === '111111' ? createNativeRoutes(contexts) : createRoutes(menuList, contexts)
    return routes
  }
  return []
}

const initPermissionPlugin = function({ defaultroute, contexts, initStore } = {}) {
  let newcontexts = contexts

  let newDefaultRoute = defaultroute
  if (!newDefaultRoute) {
    try {
      newcontexts = require.context('@/views', true, /\.vue/)
    } catch (e) {
      console.log(e)
    }
  }

  if (!newDefaultRoute) {
    try {
      newDefaultRoute = importComponents(require.context('@/router', false, /\.js/))[0]
    } catch (e) {
      console.log(e)
    }
    // newDefaultRoute = []
  }

  const newStore = initStore || {
    modules: require('@/store/index.js') || [],
    getters: require('@/store/getters.js') || []
  }

  const routes = newDefaultRoute || []
  const importRoutes = initRouters(newcontexts)
  const store = newStore ? setStore(initStore) : setStore({}, {})
  return { router: getRouter(routes, importRoutes), store }
}

export {
  initPermissionPlugin,
  setStore,
  sduqMethod,
  initRouters,
  Layout
}
