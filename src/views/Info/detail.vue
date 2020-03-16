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

      <el-form-item label="缩略图：">
        <el-upload
          class="avatar-uploader"
          action="https://up-z2.qiniup.com"
          :data="data.uploadKey"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="form.imgUrl" :src="form.imgUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

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
import { GetList, EditInfo, QiniuToKen } from "../../api/news.js";
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
        editorOption: {},
        uploadKey:{ 
          token: "",  // 接收七牛云返回token
          key:""  // 接收图片上传后的key
        }
      },
      form: {
        categoryId: "",
        title: "",
        dataTime: "",
        content: "",
        imgUrl: ""
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
    // 获取分类
    this.getInfoCategory();
    // 获取列表
    this.getList();
    this.getQiniuToKen()
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
          this.form.categoryId = responseData.categoryId;
          this.form.title = responseData.title;
          this.form.dataTime = timestampToTime(responseData.createDate);
          this.form.content = responseData.content;
          this.form.imgUrl = responseData.imgUrl;
          this.formLoading = false;
        })
        .catch(error => {
          this.formLoading = false;
        });
    },
    // 获取七牛云ToKen
    getQiniuToKen(){
      let requestData = {
        "accesskey": "6X23KIUVA-OeztkG0o3GcgY_ZK0BkX1rqUf8GjAZ",
        "secretkey": "yMubs3KfPwS7SaSW3OJw-y52efWe0NoKedgBAEMC",
        "buckety": "joekore"
      }
      QiniuToKen(requestData).then(response => {
        console.log(response)
        let responseData = response.data.data.token
        this.data.uploadKey.token = responseData
      })
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
      // this.form.imgUrl = `http://xxxxxxx${res.key}`
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }

      // 文件名转码
      let suffix = file.name
      let key = encodeURI(`${suffix}`)
      this.data.uploadKey.key = key

      return isJPG && isLt2M;
    },
    // 提交表单
    submit() {
      this.submitLoading = true;
      // 根据后台API传参
      let requestData = {
        id: this.id,
        categoryId: this.form.categoryId,
        title: this.form.title,
        content: this.form.content,
        imgUrl: this.form.imgUrl
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
    },
  }
};
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>