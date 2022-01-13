import request from '../utils/request'

// const baseUrl = process.env.VUE_APP_BASE_URL

const baseUrl = ''

export function curryingApi(url, suburl, type) {
  return function(params) {
    const requestObj = {
      url: `${baseUrl}/${url}/${suburl}`,
      method: type
    }
    if (type === 'get') {
      requestObj.params = params
    } else {
      requestObj.data = params
    }
    return request(requestObj)
  }
}

// export function curryingApi(url, suburl, type) {
//   if (type === 'delete' || type === 'detail') {
//     const methed = type === 'delete' ? 'delete' : 'get'
//     const newSuburl = suburl || (type === 'delete' ? 'deleteById' : 'getById')
//     return function(data) {
//       return request({
//         url: `${baseUrl}/${url}/${newSuburl}/${data.id}`,
//         method: methed
//       })
//     }
//   }

//   if (type === 'update' || type === 'save') {
//     const methed = type === 'update' ? 'put' : 'post'
//     const newSuburl = type === 'update' ? 'update' : 'save'
//     return function(data) {
//       return request({
//         url: `${baseUrl}/${url}/${newSuburl}`,
//         method: methed,
//         data
//       })
//     }
//   }

//   return function(params) {
//     return request({
//       url: `${baseUrl}/${url}/${suburl}`,
//       method: 'get',
//       params
//     })
//   }
// }
