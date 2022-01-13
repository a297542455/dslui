// import { curryingApi } from '@/api/currying'
const defaultbaseUrl = process.env.VUE_APP_BASE_URL
import request from '@/utils/request'
import qs from 'qs'

// import { curryingApi } from 'dslManagementUI'

const mixin = {
  data: function() {
    return {
      pageDatas: [],
      list: [],
      data: { totalCount: 0 },
      api: {
        url: ''
      },
      detail: {},
      parmas: {
        pageSize: 10,
        pageNo: 1
      },
      addApi: {},
      defaultApi: {

        save: '/save',
        delete: '/deleteById',
        update: '/update',
        page: '/page',
        list: '/list',
        detail: '/getById'
      }
    }
  },
  computed: {
    subApi() {
      return { ...this.defaultApi, ...this.addApi }
    }
  },
  watch: {
    dialogVisible(val) {
      // if (!val) {
      //   this.dialogCallBack()
      // }
    }
  },

  methods: {
    editCallBack() {
      this.query()
    },
    curryingApi(url, method, currentbaseURL) {
      return function(parmas) {
        const baseUrl = currentbaseURL || defaultbaseUrl

        const requestObj = {
          url: `${baseUrl}/${url}`,
          method
        }
        if (method === 'get') {
          const parmasStr = `?${qs.stringify(parmas)}`
          requestObj.url = `${requestObj.url}${parmasStr}`
        } else {
          requestObj.data = parmas
        }
        return request(requestObj)
      }
    },

    // 查询
    async query() {
      const newparmas = { ...this.parmas }
      const { api, subApi } = this

      const getPage = this.curryingApi(`${api.url}${subApi.page}`, 'get')

      const res = await getPage(newparmas)

      this.data = { ...res.data }
    },
    // 查询列表
    async querylist() {
      const { api, subApi } = this
      const getPage = this.curryingApi(`${api.url}${subApi.list}`, 'get')
      const res = await getPage()
      this.list = [...res.data]
    },
    // 删除
    async deleteById(id) {
      const { api, subApi } = this
      const res = await this.curryingApi(`${api.url}${subApi.delete}/${id}`, 'delete')()
      this.editCallBack()
      return res
    },
    // 查询详情
    async getDetailById(id) {
      const { api, subApi } = this
      const res = await this.curryingApi(`${api.url}${subApi.detail}/${id}`, 'get')()
      this.detail = { ...res.detail }
      return res
    },
    // 保存
    async save(data) {
      const { api, subApi } = this
      const res = await this.curryingApi(`${api.url}${subApi.save}`, 'post')(data)
      this.editCallBack()
      return res
    },
    // 更新
    async update(data) {
      const { api, subApi } = this
      const res = await this.curryingApi(`${api.url}${subApi.update}`, 'put')(data)
      this.editCallBack()
      return res
    }
  }

}

export default mixin
