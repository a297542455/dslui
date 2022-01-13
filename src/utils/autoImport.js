
import Layout from '../layout'
import { filterStr } from './index'

export function filterNoDefault(context) {
  return context.keys().filter(item => context(item).default).map(item => {
    var value = context(item)
    return value.default || value
  })
}

export function importComponents(context) {
  return context.keys().map(item => {
    var value = context(item)
    const newValue = value.default || value
    newValue.fileName = item
    return newValue
  })
}

export function createRoutes(menuList, contexts, parentPath = '') {
  let newarr1 = []
  for (const x in menuList) {
    if (menuList[x] && menuList[x].parentId === -1) {
      const parentroute = menuList[x] && menuList[x].parentId === -1 && createRoutes(menuList[x]['permissionList'], contexts, parentPath)
      newarr1 = [...parentroute]
      continue
    }

    const val = menuList[x]
    const path = `${parentPath}/${val['descr']}`
    const com = contexts.find(elm => {
      const importpaths = elm.fileName.split('/')
      if (importpaths.length === 3) {
        const importpath1 = filterStr(importpaths[1]).toLocaleUpperCase()
        const parentPath1 = filterStr(parentPath).toLocaleUpperCase()

        const importpath2 = filterStr(importpaths[2]).replace('.vue', '').toLocaleUpperCase()
        const descr2 = filterStr(val['descr']).toLocaleUpperCase()

        return importpath1.indexOf(parentPath1) > -1 && importpath2.indexOf(descr2) > -1
      }
      return false
    })
    console.log(com, 'com')
    if (menuList[x].level === 1) {
      const component = parentPath ? com : Layout
      const icon = val['icon'] ? val['icon'] : 'dashboard'
      const hidden = com && (com.hidden || false)
      const route = {
        path,
        name: `/${val['descr']}`,
        hidden,
        component,
        meta: { title: `${val['name']}`, icon }}
      if (menuList[x]['permissionList'] && menuList[x]['permissionList'].some(elm => elm.level === 1)) {
        route.children = createRoutes(menuList[x]['permissionList'], contexts, path)
      }
      newarr1.push(route)
    }
  }
  return newarr1
}

export function createNativeRoutes(contexts) {
  const routerObj = {}

  contexts.forEach(element => {
    const filearr = element.fileName.split('/')
    console.log(filearr)
    if (filearr.length === 3 && !element.disabled) {
      if (!routerObj[filearr[1]]) {
        routerObj[filearr[1]] = {
          path: `/${filearr[1]}`,
          component: Layout,
          name: `/${filearr[1]}`,
          meta: { title: filearr[1], icon: `dashboard` }
        }
      }

      const route = {
        path: `/${filearr[1]}/${filearr[2]}`,
        name: `/${filearr[1]}/${filearr[2]}`,
        component: element,
        meta: { title: `${filearr[2]}`, icon: 'dashboard' }}

      if (!routerObj[filearr[1]].children) {
        routerObj[filearr[1]].children = [route
        ]
        console.log(routerObj[filearr[1]].children)
      } else {
        routerObj[filearr[1]].children = [
          ...routerObj[filearr[1]].children, route
        ]
      }
    }
  })

  return Object.values(routerObj)
}
