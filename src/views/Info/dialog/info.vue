<template>
  <div>
    <el-dialog title="收获地址" :visible.sync="flag">
      
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "dialogInfo",
  // 子组件接收到传参 做哪些操作
  props: {
    flag: {
      type: Boolean, // 自定义接收的值类型
      default: false // 当传参没有值的时候 可以自定义默认值
    },
  },
  data() {
    return {
        dialog_info: false
    };
  },

  computed: {},

  created() {},

  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>