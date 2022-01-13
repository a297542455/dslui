
import Router from 'vue-router'

import { getToken } from './utils/auth'
/* Layout */
import Layout from './layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('./views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('./views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('./views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }
    ]
  },

  // 404 page must be placed at the end !!!
  // { path: 'index.html', redirect: '/', hidden: true },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

let router = null

const createRouter = (defaultroute, addroutes) => {
  console.log(defaultroute, addroutes)
  if (!router) {
    const initRoutes = [...constantRoutes, ...defaultroute]
    console.log(initRoutes)
    router = new Router({
      mode: 'hash', // require service support
      scrollBehavior: () => ({ y: 0 }),
      routes: initRoutes
    })
  }
  let newRoutes = []

  if (addroutes.length > 0) {
    newRoutes = [...newRoutes, ...addroutes]
  }
  newRoutes = [...router.options.routes, ...newRoutes]
  router.options.routes = newRoutes
  router.addRoutes(addroutes)

  router.beforeEach(beforeEachCallBack)

  return router
}

const beforeEachCallBack = (to, from, next) => {
  const isAuthenticated = getToken() !== void 0
  if (to.path !== '/login' && !isAuthenticated) next({ path: '/login' })
  else next()
}

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default createRouter
