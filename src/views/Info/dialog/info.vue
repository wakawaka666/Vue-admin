<template>
  <div>
    <!-- :visible.sync / @close element-ui文档 -->
    <el-dialog title="新增" :visible.sync="dialog_info_flag" @close="close">
      <el-form :model="form">
        <el-form-item label="类别：" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题：" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="概况：" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.name" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="danger" @click="dialogFormVisible = false">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "dialogInfo",
  data() {
    return {
      dialog_info_flag: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "70px"
    };
  },

  // 子组件接收到传参 做哪些操作
  props: {
    flag: {
      type: Boolean, // 自定义接收的值类型
      default: false // 当传参没有值的时候 可以自定义默认值
    }
  },

  // 监听
  watch: {
    // 需要用父组件定义的属性flag 来做监听
    flag: {
      handler(newValue, oldValue) {
        this.dialog_info_flag = newValue;
      }
    }
  },

  computed: {},

  created() {},

  mounted() {},

  methods: {
    close() {
      this.dialog_info_flag = false;
      // 不需要逻辑处理的时候 使用修饰器
      this.$emit("update:flag", false);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>