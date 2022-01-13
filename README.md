# 大参林权限和综合组件库dslui #

1.  提供CommonForm、CommonTable、CommonPagination等公共组件
2.  改写整个项目layout,实现权限统一管理

## 项目接入 ##
```bash

Vue.use(dslui, { isUIonly: true })
#   仅使用公共组件，不使用layout

Vue.use(dslui)
#   使用公共组件和layout
```


## 使用方法 ##

```bash
npm install

npm run dev
```

## 方法案例 ##
1.  项目启动后可看到CommonForm等共组件的文档和案例，可本地启动并查看效果
