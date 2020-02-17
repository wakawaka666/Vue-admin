import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // 路由重定向
  {
    path: '/',
    redirect: "login",
    //添加hidden属性到 Nav.vue来做判断是否隐藏
    hidden: true,
    // 添加meta属性用来循环路由标题 
    meta: {
      name: "主页"
    },
  },
  {
    path: '/login',
    name: 'login',
    hidden: true,
    meta: {
      name: "登录"
    },
    component: () => import('../views/Login/index.vue'),
  },
  {
    path: '/Console',
    name: 'console',
    // 在console路由中可以使用 redirect重定向到其子路由下 使其页面显示子路由
    redirect: "index",
    meta: {
      name: "控制台",
      icon: "console"
    },
    component: () => import('../views/Layout/index.vue'),
    // 引入console子页面 到main.vue组件页面中
    children: [{
      path: '/Index',
      name: 'index',
      meta: {
        name: "首页"
      },
      component: () => import('../views/Console/index.vue'),
    }]
  },
  // ---------------------------信息管理------------------------------
  {
    path: '/info',
    name: 'Info',
    meta: {
      name: "信息管理",
      icon: "info"
    },
    component: () => import('../views/Layout/index.vue'),
    children: [{
        path: '/infoIndex',
        name: 'InfoIndex',
        meta: {
          name: "信息列表"
        },
        component: () => import('../views/Info/index.vue'),
      },
      {
        path: '/indexCategory',
        name: 'IndexCategory',
        meta: {
          name: "信息分类"
        },
        component: () => import('../views/Info/category.vue'),
      },
      {
        path: '/infoDetail',
        name: 'InfoDetail',
        hidden: true,
        meta: {
          name: "信息详情"
        },
        component: () => import('../views/Info/detail.vue'),
      },
    ]
  },
  // ---------------------------用户管理------------------------------
  {
    path: '/user',
    name: 'User',
    meta: {
      name: "用户管理",
      icon: "user"
    },
    component: () => import('../views/Layout/index.vue'),
    children: [{
      path: '/userIndex',
      name: 'UserIndex',
      meta: {
        name: "用户列表"
      },
      component: () => import('../views/User/index.vue'),
    }, ]
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router