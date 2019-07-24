import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login/',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: '/user/register/',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info/',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout/',
    method: 'get'
  })
}

export function getParent(token) {
  return request({
    url: '/user/Parent/',
    method: 'get'
  })
}

// http://127.0.0.1:7087/cgi_din/api/v1/user/Setting/?key=award
export function getSetting(query) {
  return request({
    url: '/user/Setting/',
    method: 'get',
    params: query
  })
}

export function setSetting(data) {
  return request({
    url: '/user/Setting/',
    method: 'post',
    data
  })
}
export function getChildren(query) {
  return request({
    url: '/user/Parent/children/',
    method: 'get',
    params: query
  })
}
