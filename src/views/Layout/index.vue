<template>
    <!-- class三目运算属性 在computed监听到的isCollapse为true时  相当于class="close" -->
    <div id="layout" :class="[menuStatus ? 'close' : 'open']">
        <!-- 把组件页面组合添加到layout -->
        <LayoutHeader></LayoutHeader>
        <LayoutMain></LayoutMain>
        <LayoutNav></LayoutNav>
    </div>
</template>

<script>
// 引入 Header Main Nav 组件
import LayoutHeader from './Component/Header'
import LayoutMain from './Component/Main'
import LayoutNav from './Component/Nav'

export default {
    name: 'layout',
    // 注册引入的组件
    components:{
        LayoutHeader,
        LayoutMain,
        LayoutNav
    },
    
    data(){
        return{

        }
    },
    created(){

    },
    mounted(){

    },
    computed:{
        
        // 监听Nav菜单收缩状态 调整页面布局
        menuStatus: function(){
            return this.$store.state.app.isCollapse
        }

    },
    methods:{

    }
    
}
</script>

<style lang="scss" scoped>
    
</style>