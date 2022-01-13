
import { Layout } from '@'
import commonform from './commonform'
import commontable from './commontable'
import guide from './guide/index.md'

const dosc = (function() {
  return {
    path: '/docs',
    redirect: '/docs/commonform',
    component: Layout,
    meta: { title: '文档', icon: 'dashboard' },
    children: [
      {
        path: 'commonform',
        name: 'commonform',
        component: commonform,
        meta: { title: '表单组件', icon: 'dashboard' }
      },
      {
        path: 'commontable',
        name: 'commontable',
        component: commontable,
        meta: { title: '列表组件', icon: 'dashboard' }
      },
      {
        path: 'guide',
        name: 'guide',
        component: guide,
        meta: { title: '初始化指引', icon: 'dashboard' }
      }
    ]
  }
}())

export default dosc
