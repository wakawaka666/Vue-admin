<template>
  <div>
    <!-- :visible.sync / @close / @opened点击新增Dialog后再执行方法 -->
    <el-dialog title="编辑" :visible.sync="dialog_info_flag" @close="close" @opened="openDialog">
      <el-form :model="form">
        <el-form-item label="类别：" :label-width="formLabelWidth">
          <el-select v-model="form.category" placeholder="请选择活动区域">
            <el-option
              v-for="item in categoryOptions.item"
              :key="item.id"
              :label="item.category_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题：" :label-width="formLabelWidth">
          <el-input v-model="form.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="概况：" :label-width="formLabelWidth">
          <el-input type="textarea" v-model="form.content" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取消</el-button>
        <el-button type="danger" @click="submit" @loading="submitLoading">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { AddInfo, GetList, EditInfo } from "../../../api/news";
export default {
  name: "dialogInfo",
  data() {
    return {
      formLabelWidth: "70px",
      dialog_info_flag: false,
      form: {
        category: "",
        title: "",
        content: ""
      },
      categoryOptions: {
        item: []
      },
      submitLoading: false
    };
  },

  // 子组件接收到属性传参 做哪些操作
  props: {
    flag: {
      type: Boolean, // 自定义接收的值类型
      default: false // 当传参没有值的时候 可以自定义默认值
    },
    category: {
      type: Array, // 自定义接收的值类型
      default: function() {
        return [];
      } // 当传参没有值的时候 可以自定义默认值
    },
    id: {
      type: String, // 自定义接收的值类型
      default: "" // 当传参没有值的时候 可以自定义默认值
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
      this.resetForm();
    },
    // 弹窗打开后 父组件index传参
    openDialog() {
      this.categoryOptions.item = this.category;
      this.getInfo();
    },
    // 获取列表 
    getInfo() {
      let requestData = {
        pageNumber: 1,
        pageSize: 1,
        id: this.id
      };
      GetList(requestData).then(response => {
        // 拿到第一条数据
        let responseData = response.data.data.data[0];
        // 赋值 渲染页面
        this.form = {
          category: responseData.categoryId,
          title: responseData.title,
          content: responseData.content
        };
      });
    },
    // 提交表单
    submit() {
      if (!this.form.category) {
        this.$message({
          message: "类型不能为空！！",
          type: "error"
        });
        return false;
      }
      this.submitLoading = true;
      // 根据后台API传参
      let requestData = {
        id: this.id,
        categoryId: this.form.category,
        title: this.form.title,
        content: this.form.content
      };
      // 调用修改信息接口
      EditInfo(requestData)
        .then(response => {
          this.$message({
            message: response.data.message,
            type: "success"
          });
          // $emit 调用父组件的属性  属性值为调用的方法
          this.$emit("getList")
          this.close()
          this.resetForm();
          this.submitLoading = false;
        })
        .catch(error => {
          this.submitLoading = false;
        });
    },
    // 表单清空
    resetForm() {
      this.form.category = "";
      this.form.title = "";
      this.form.content = "";
    }
  }
};
</script>

<style lang="scss" scoped>
</style>