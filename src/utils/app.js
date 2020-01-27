import cookie from 'cookie_js'

const adminToken = "admin-token"
const usernameKey = "username"

//---------------------------------------Token--------------------------------------------

// 存入cookie
export function setToken(toKen){
    return cookie.set(adminToken, toKen)
}

// 获取cookie
export function getToken(){
    return cookie.get(adminToken)
}

// 删除cookie
export function removeToken(toKen){
    return cookie.remove(adminToken)
}

//---------------------------------------UserName--------------------------------------------

// 存入cookie
export function setUserName(value){
    return cookie.set(usernameKey, value)
}

// 获取cookie
export function getUserName(){
    return cookie.get(usernameKey)
}