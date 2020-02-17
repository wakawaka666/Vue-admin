<template>
  <div>
    <el-form ref="form" :model="form" label-width="120px" v-loading="formLoading">
      <el-form-item label="信息分类：">
        <el-select v-model="form.categoryId">
          <el-option
            v-for="item in data.category"
            :key="item.id"
            :value="item.id"
            :label="item.category_name"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="新闻标题：">
        <el-input v-model="form.title"></el-input>
      </el-form-item>

      <el-form-item label="缩略图："></el-form-item>

      <el-form-item label="发布日期：">
        <el-date-picker v-model="form.dataTime" type="date" placeholder="选择日期" :disabled="true"></el-date-picker>
      </el-form-item>

      <el-form-item label="详细内容：">
        <quillEditor v-model="form.content" ref="myQuillEditor" :options="data.editorOption" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit" :loading="submitLoading">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { GetList, EditInfo } from "../../api/news.js";
import { timestampToTime } from "../../utils/common";

import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

export default {
  data() {
    name: "infoDetail";
    return {
      // 接收路由传参
      id: this.$route.params.id,
      title: this.$route.params.title,
      data: {
        category: [],
        editorOption: {}
      },
      form: {
        categoryId: "",
        title: "",
        dataTime: "",
        content: ""
      },
      submitLoading: false,
      formLoading: true
    };
  },
  components: { quillEditor },
  props: {},
  computed: {},
  created() {},
  mounted() {
    console.log(this.id);
    console.log(this.title);
    // 获取分类
    this.getInfoCategory()
    // 获取列表
    this.getList();
  },
  methods: {
    // 获取分类
    getInfoCategory() {
      this.$store.dispatch("common/getCategory").then(response => {
        this.data.category = response;
      });
    },
    // 获取列表
    getList() {
      let requestData = {
        pageNumber: 1,
        pageSize: 1,
        id: this.id
      };
      // 调用获取列表接口
      GetList(requestData)
        .then(response => {
          let responseData = response.data.data.data[0];
          console.log(responseData)
          this.form.categoryId = responseData.categoryId;
          this.form.title = responseData.title;
          this.form.dataTime = timestampToTime(responseData.createDate);
          this.form.content = responseData.content;
          this.formLoading = false;
        })
        .catch(error => {
          this.formLoading = false;
        });
    },
    // 修改数据内容
    // 提交表单
    submit() {
      this.submitLoading = true;
      // 根据后台API传参
      let requestData = {
        id: this.id,
        categoryId: this.form.categoryId,
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
          this.submitLoading = false;
        })
        .catch(error => {
          this.submitLoading = false;
        });
    }
  }
};
</script>

<style lang="">
</style>