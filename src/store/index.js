import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app.js'
import login from './modules/login.js'
import common from './modules/common.js'



Vue.use(Vuex)

export default new Vuex.Store({
    // Store 模块
    modules:{
        app,
        login,
        common,
    }
})