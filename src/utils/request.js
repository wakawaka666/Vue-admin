import axios from 'axios'
// 因为是新创建的单页面所以需要单独引用
import { Message } from 'element-ui';
import {getToken, getUserName} from './app'

// 定义BASEURL 从vue.config.js把devAPI（判断环境如果不是production那就使用devApi）传给baseURL
const BASEURL = process.env.NODE_ENV === 'production' ? '' : '/devApi';

// 创建axios 赋给变量service  添加API地址
const service = axios.create({
    baseURL: BASEURL,
    timeout: 15000, //在10秒内发出请求 如果没有请求到就报超时
  });

// 请求接口前 做一些数据处理 (请求拦截器)
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么

    //后台需要前端这边传相关参数 （在请求头添加参数 Request.Headers）
    //Token
    //userID
    //aid....
    // console.log(config.headers)
    // 根据业务需求


    //最终目的是在请求头添加参数
    config.headers['Tokey'] = getToken()
    config.headers['UserName'] = getUserName()

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 请求接口后 返回数据进行拦截 (响应拦截器)
service.interceptors.response.use(function (response) {
    // 后端对响应数据拦截做点什么
    // console.log(response)
    let data = response.data
    // 判断后台数据里的resCode做拦截
    if(data.resCode !== 0){
        // 使用后台里的message 不写死
        Message.error(data.message);
        return Promise.reject(data);
    }else{
        return response;
    }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});



export default service

 /* 
    使用export default是指默认使用暴露的变量 且不能存在多个default
    文件引用时import不需要花括号
 */
