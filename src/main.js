import Vue from 'vue'
import App from './App.vue'
// 因为router.js已经暴露出来 所以直接引入router  在页面中使用this.$router即可
import router from './router/router.js'
// 引入路由守卫
import './router/guard.js'
// 同上
import store from './store'
// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入reset.css
import '../src/assets/css/reset.scss'
// 引入自定义全局组件 SVG
import './icons/index.js'
// 引入自定义全局方法 
import global from './utils/global.js'



Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(global)



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
