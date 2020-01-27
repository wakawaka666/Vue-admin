// 引入axios（赋给变量service）拦截器
import service from "../utils/request.js";

/* 
获取验证码
*/
export function GetSms(data) {
    // return 从request.js请求错误的信息返回给index.vue 里的 GetSms()
    return service.request({
        method: "post",
        url: "/getSms/",
        data
    })
}

/* 
获取用户角色
*/

/* 
登录
*/
export function Login(data){
    return service.request({
        method: "post",
        url: "/login/",
        data
    })
}

/* 
注册
*/
export function Register(data){
    return service.request({
        method: "post",
        url: "/register/",
        data
    })
}