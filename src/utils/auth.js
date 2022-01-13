import Cookies from 'js-cookie'

const TokenKey = 'dslToken'
const Menulist = 'Menulist'
const Username = 'Username'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setMenuList(list) {
  return sessionStorage.setItem(Menulist, JSON.stringify(list))
}

export function removeMenuList() {
  return sessionStorage.removeItem(Menulist)
}

export function getMenuList() {
  return JSON.parse(sessionStorage.getItem(Menulist))
}

export function setUsername(name) {
  return sessionStorage.setItem(Username, name)
}

export function removeUsername() {
  return sessionStorage.removeItem(Username)
}

export function getUsername() {
  return sessionStorage.getItem(Username)
}
