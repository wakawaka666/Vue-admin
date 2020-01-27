<template>
  <div id="nav-wrap">
    <i class="logo"><img src="../../../assets/logo.png" alt=""></i>
    <!-- 添加router 是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <!--循环路由里meta的数组信息 添加template是把 v-for和v-if 分开来写 不建议都在一个标签内使用 -->
      <template v-for="(item, index) in routers">
        <!-- 判断路由里的hidden 因为true代表显示 所以使用反选 ！ (item指循环出来的每个路由)  "index + '' "是因为v-for循环出来的是number 需要这个方法转换成字符串形式才不会报错 -->
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">
          <!-- 一级菜单 -->
          <template slot="title">
            <i :class="item.meta.icon"></i>
            <!-- SVG图标 父组件传参给子组件SvgIcon.vue -->
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.name" />
            <span slot="title">{{item.meta.name}}</span>
          </template>

          <!-- 二级菜单 -->
          <!-- 使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转 -->
          <el-menu-item
            :index="subItem.path"
            v-for="subItem in item.children"
            :key="subItem.id"
          >{{subItem.meta.name}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "navMenu",
  data() {
    

    return {
      // 调取路由信息
      // console.log(this.$router)
      routers: this.$router.options.routes,
      // elemnt-ui NavMenu展开
      // isCollapse: false
    };
  },

  computed:{
    // 实时监听 存入的状态（store.state）
    isCollapse: function(){
      // console.log(this.$store.state.isCollapse)
      return this.$store.state.app.isCollapse
    }
  },

  created() {},

  mounted() {},
  methods: {
    
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/css/config.scss";

.logo{
  text-align: center;
  img{
    display: block;
    width: 92px;
    margin: 25px auto;
    @include webkit(transition,all .3s ease 0s)
  }
}
#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  background-color: #344a5f;
  @include webkit(transition,all .3s ease 0s)
}
svg{
    font-size: 20px;
    margin-right: 10px;

}
.open{
  #nav-wrap{
    width: $navMenu;
  }
}
.close{
  #nav-wrap{
    width: 64px;
  }
  .logo img{
    width: 60%;
  }
}
</style>