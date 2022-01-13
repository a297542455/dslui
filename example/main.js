import Vue from 'vue'
import App from './App.vue'

import dslUI, { initPermissionPlugin } from '../src'

import Router from 'vue-router'
import Vuex from 'vuex'
import defaultroute from './routes'

import 'prismjs/themes/prism.css'
import '@/styles/index.scss' // global css
import ElementUI from 'element-ui'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Vuex)
Vue.use(Router)
Vue.use(dslUI)

let instance = null
function render(props = {}) {
  const { container } = props

  const { router, store } = initPermissionPlugin({ defaultroute })

  instance = new Vue({
    store,
    router,
    render: (h) => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')

  console.log(instance)
}

render()

