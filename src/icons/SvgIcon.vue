<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconsName" />
  </svg>
</template>

<script>
export default {
  name: "svgIcon",
  // 子组件接收到传参 做哪些操作
  props: {
    iconClass: {
      type: String, // 自定义接收的值类型
      default: "" // 当传参没有值的时候 可以自定义默认值
    },
    className: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  // computed监听属性变化 再计算属性
  computed: {
    iconsName(props) {
      return `#icon-${props.iconClass}`;
    },
    svgClass(props) {
      if (props.className) {
        return `svg-icon ${props.className}`;
      } else {
        return `svg-icon`;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '../assets/css/svg.scss'
</style>