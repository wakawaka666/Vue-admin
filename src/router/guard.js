import router from './router.js'
// 导入cookie方法    使用 { xxx , xxx }
import {
    getToken
} from '../utils/app.js'

// 定义一个白名单地址做判断
const whiteRouter = ['/login'] //indexOf方法：判断数组中是否存在指定的某个对象

// 路由守卫
// to：跳转下一个页面 from：上一页面 next：
router.beforeEach((to, from, next) => {
    if (getToken()) {
        next()
    } else {
        // 判断是否有白名单地址    !== -1 指存在白名单地址  
        if (whiteRouter.indexOf(to.path) !== -1) {
            next()
        } else {
            next('/login')
        }
    }
})