// 导入Login接口
import { Login } from '../../api/login.js'
// 导入自定义cookie方法 (存入的token)
import {setToken, setUserName, getUserName} from '../../utils/app.js'

// 存入状态
const state = {
    // 1：先存入状态  2：头部页面按钮写好单击事件（调用mutations更改状态） 3：侧边栏页面使用computed来实时监听存入状态（state)
    // H5 本地存储 取！  false || false 取后面false     true || false 取true
    isCollapse: JSON.parse(localStorage.getItem('isCollapse')) || false,
    // isCollapse: JSON.parse(Cookie.get('isCollapse')) || false //JSON.parse 转对象 使用cookie_js

    username: getUserName() || '',
    to_ken: '',
}

// 存入状态 可计算状态
const getters = {}

// 更改状态方法  传参1：存入的状态名  传参2：value值  页面调用：this.$store.commit('方法名', 'value')
const mutations = {
    SET_COLLAPSE(state) {
        state.isCollapse = !state.isCollapse,
            // H5 本地存储 存！    参数1：调用名称  参数2：所要存入的数据（只能存字符串 JSON.stringify转字符串）   
            localStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
        // Cookie.set('isCollapse',JSON.stringify(state.isCollapse))  //使用cookie_js
    },

    SET_USERNAME(state, value){
        state.username = value
    },

    SET_TOKEN(state, value){
        state.to_ken = value
    },
}

// 异步操作
const actions = {
    login(content, requestData) {
        return new Promise((resolve, reject) => {
            // 调用Login接口
            Login(requestData).then((response) => {

                let data = response.data.data
                
                // 存入后台响应的 token username 到 VueX  作用：在Header显示username
                content.commit('SET_TOKEN', data.token)
                content.commit('SET_USERNAME', data.username)

                // 存入后台响应的 token username 到 cookie 作用：路由守卫判断cookie有无token 进行跳转
                setToken(data.token)
                setUserName(data.username)

                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    }
}



export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}