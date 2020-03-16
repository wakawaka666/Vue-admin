<template>
  <div id="header-wrap">
    <div class="pull-left header-icon" @click="navMenuStatus">
      <svg-icon iconClass="menu" className="menu" />
    </div>
    <div class="pull-right">
      <div class="user-info pull-left">
        <div class="pull-left avatar-margin">
          <svg-icon iconClass="avatar" className="avatar" />
        </div>
        <div class="pull-right">
          {{username}}
        </div>
      </div>
      <div class="pull-left header-icon">
        <svg-icon iconClass="exit" className="exit" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  computed:{
    // 用户名
    username: function(){
      return this.$store.state.app.username
    }
  },
  created(){

  },
  mounted(){

  },
  methods:{
    // 调用mutations更改存入状态
    navMenuStatus(  ){
      // 调用store mutation里的方法
      this.$store.commit('app/SET_COLLAPSE')
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/css/config.scss";

#header-wrap {
  z-index: 1;
  position: fixed;
  top: 0;
  right: 0;
  left: $navMenu;
  height: 75px;
  line-height: 75px;
  background-color: #fff;
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.1));
  @include webkit(transition,all .3s ease 0s);
  .pull-left {
    float: left;
    height: 75px;
  }
  .pull-right {
    float: right;
    height: 75px;
  }
  .header-icon {
    padding: 0 32px;
  }
  .user-info{
    height: 100%;
    border-right: 1px solid #ededed;
    
    padding: 0 32px;
    + .header-icon{
      padding: 0 28px;
    }

  }
  .svg-icon {
      width: 2rem;
      height: 2rem;
      margin-top: 20px;
      cursor: pointer;
    }
    .avatar-margin{
      margin-right: 15px;
    }
}
.open{
  #header-wrap{
    left: $navMenu;
  }
}
.close{
  #header-wrap{
    left: $navMenuMin;
  }
}
</style>