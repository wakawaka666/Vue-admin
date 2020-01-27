// 自定义全局组件 
import Vue from 'vue'; //使用Vue的方法
import SvgIcon from './SvgIcon.vue' //把写好的template模板导入进来

// 自定义组件 第一个参数是组件名 → 在页面中添加<svg-icon />   第二个参数是template模板
Vue.component('svg-icon', SvgIcon)

// 解析SVG图标   require.context读取指定目录文件  第二个形参指是否遍历子级目录  第三个形参指遍历文件规则
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => {
    // 解析所有的文件名
    return requireContext.keys().map(requireContext)
}
requireAll(req)