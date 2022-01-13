import request from '../utils/request'

const stagebaseUrl = 'https://bespeak-test.dslbuy.com'

const baseUrl = stagebaseUrl

/**
   * 通用接口查询接口
   **/
// 登录口
export function login(data) {
  const { tenantId, username, password } = data
  console.log(baseUrl)
  return request({
    url: `${baseUrl}/sso/oauth/login?username=${username}_${tenantId}&password=${password}&scope=all&grant_type=password&client_id=webApp&client_secret=123456`,
    method: 'post'
  })
}

export function getUserPermissionList(parmas) {
  return request({
    url: `${baseUrl}/dslMemberAdmin/sys-permission/getUserPermissionList`,
    method: 'get',
    parmas
  })
}
3
