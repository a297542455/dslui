## 权限组件



```javascript
import dslManagementUI, { createRouter, initRouters, setStore } from 'dslManagementUI'
Vue.use(dslManagementUI, { loginUrl: '', menulistUrl: '' })

function render(props = {}) {
  const { container } = props
  const store = setStore({}, {})

  const router = createRouter('permissionManagerAdmin')
  const routes = initRouters(require.context('@/views', true, /\.vue/))
  const newRoutes = [...router.options.routes, ...defaultroute, ...routes]
  router.options.routes = newRoutes
  router.addRoutes(newRoutes)

  instance = new Vue({
    router,
    store,
    render: (h) => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

