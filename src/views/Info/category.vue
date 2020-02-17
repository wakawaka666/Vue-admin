<template>
  <div id="category">
    <el-button type="danger" @click="addFirst({type: 'category_first_add'})">添加一级分类</el-button>
    <hr class="hr-e9e9e9" />
    <el-row :gutter="30">
      <el-col :span="10">
        <div class="category-wrap">
          <div class="category" v-for="firstItem in category.item" :key="firstItem.id">
            <!-- 一级分类 -->
            <h4>
              <svg-icon icon-class="plus" />
              {{firstItem.category_name}}
              <div class="button-group">
                <!-- editCategory()方法 把firstItem.category类名 赋值给 category形参 -->
                <el-button
                  size="mini"
                  type="danger"
                  @click="editCategory({data: firstItem, type: 'category_first_edit'})"
                  round
                >编辑</el-button>
                <el-button
                  size="mini"
                  type="success"
                  round
                  @click="handlerAddChildren({data: firstItem, type: 'category_children_add'})"
                >添加子级</el-button>
                <!-- firstItem.id 是由 category.item循环出来 再传参给方法接收 -->
                <el-button size="mini" @click="deleteCategoryConfirm(firstItem.id)" round>删除</el-button>
              </div>
            </h4>
            <!-- 二级分类 -->
            <ul v-if="firstItem.children">
              <li v-for="childrenItem in firstItem.children" :key="childrenItem.id">
                {{childrenItem.category_name}}
                <div class="button-group">
                  <el-button size="mini" type="danger" round>编辑</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="14">
        <h4 class="menu-title">一级分类编辑</h4>
        <el-form
          :label-position="labelPosition"
          label-width="150px"
          class="form-wrap"
          ref="categoryForm"
        >
          <el-form-item label="一级分类名称：" v-if="category_first_input">
            <el-input v-model="form.categoryName" :disabled="category_first_disabled"></el-input>
          </el-form-item>
          <el-form-item label="二级分类名称：" v-if="category_children_input">
            <el-input v-model="form.secCategoryName" :disabled="category_children_disabled"></el-input>
          </el-form-item>
          <el-form-item>
            <!-- :loading属性 true显示 -->
            <el-button
              type="danger"
              @click="submit"
              :loading="submit_button_loading"
              :disabled="submit_button_disabled"
            >确定</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 引入 添加一级分类 添加子级分类 获取一级分类 删除一级分类 修改一级分类 接口
import {
  AddFirstCategory,
  AddChildrenCategory,
  DeleteCategory,
  EditCategory,
  GetCategoryAll
} from "../../api/news";
export default {
  name: "infoCategory",
  data() {
    //----------------------基础数据/数据结构----------------------------
    return {
      labelPosition: "right",
      formLabelAlign: {
        name: "",
        region: "",
        type: ""
      },
      // 一级 二级分类显示/隐藏
      category_first_input: true,
      category_children_input: true,
      // 表单传参
      form: {
        categoryName: "",
        secCategoryName: ""
      },
      // 分类列表数据结构
      category: {
        item: [],
        current: []
      },
      // loading按钮状态
      submit_button_loading: false,
      // 输入框及按钮状态
      category_first_disabled: true,
      category_children_disabled: true,
      submit_button_disabled: true,
      // 设置删除的id为空
      deleteId: "",
      // 声明变量来区分类型
      submit_button_type: ""
    };
  },
  created() {},
  //----------------------生命周期 当页面DOM挂在完成后 执行实例----------------------------
  mounted() {
    this.getCategory();
  },
  methods: {
    //---------------------- 添加一级分类 (交互及确定按钮状态) ----------------------------
    addFirst(params) {
      this.submit_button_type = params.type;
      console.log(this.submit_button_type);
      // 一 二级分类显示/隐藏
      this.category_first_input = true;
      this.category_children_input = false;
      // 当点击添加一级分类 打开 一级分类输入框及按钮
      this.category_first_disabled = false;
      this.submit_button_disabled = false;
    },
    //---------------------- 添加一级分类  ----------------------------
    addFirstCategory() {
      // 判断输入框是否为空 弹出Message弹窗
      if (!this.form.categoryName) {
        this.$message({
          message: "分类名称不能为空",
          type: "error"
        });
        return false;
      }
      // 把表单上数据绑定变量传给 后台接口的固定格式
      let requestData = {
        categoryName: this.form.categoryName
      };
      // 提交后 按钮显示loading
      this.submit_button_loading = true;
      // 调用添加一级分类接口  根据后台API传参
      AddFirstCategory(requestData)
        .then(response => {
          let data = response.data;
          this.$message({
            message: data.message,
            type: "success"
          });
          // 当添加成功后 把后台新添加数据 push到 分类列表数据结构上 (实现页面更新)    注: push 数组的方法, 添加到数组末尾
          this.category.item.push(response.data.data);
          // 提交成功后 按钮不显示loading
          this.submit_button_loading = false;
          // 提交成功后 清除表单内容
          this.form.categoryName = "";
          this.form.secCategoryName = "";
        })
        .catch(error => {
          // 提交失败后 按钮不显示loading
          this.submit_button_loading = false;
          // 提交失败后 清除表单内容
          this.form.categoryName = "";
          this.form.secCategoryName = "";
        });
    },
    //---------------------- 添加子级分类 (交互及确定按钮状态) ----------------------------
    handlerAddChildren(params) {
      // 禁用一级输入框
      this.category_first_disabled = true;
      // 启用子级输入框
      this.category_children_disabled = false;
      // 启用确定按钮
      this.submit_button_disabled = false;
      // 显示子级输入框
      this.category_children_input = true;
      // 存储数据
      this.category.current = params.data;
      // 显示一级分类文本
      this.form.categoryName = params.data.category_name;
      // 更新确定按钮类型
      this.submit_button_type = params.type;
    },
    //---------------------- 添加子级分类 ----------------------------
    addChildrenCategory() {
      if (!this.form.secCategoryName) {
        this.$message({
          message: "子级分类名称不能为空！！",
          type: "error"
        });
        return false;
      }
      let requestData = {
        categoryName: this.form.secCategoryName,
        parentId: this.category.current.id
      };
      AddChildrenCategory(requestData).then(response => {
        let responseData = response.data;
        this.$message({
          message: responseData.message,
          type: "success"
        });
        this.getCategoryAll();
        this.form.secCategoryName = "";
      });
    },
    //---------------------- 表单提交传参 ----------------------------
    submit() {
      // 根据类型 调用不同的方法  一级分类添加
      if (this.submit_button_type == "category_first_add") {
        this.addFirstCategory();
      }
      // 一级分类编辑
      if (this.submit_button_type == "category_first_edit") {
        this.editFirstCategory();
      }
      // 子级分类添加
      if (this.submit_button_type == "category_children_add") {
        this.addChildrenCategory();
      }
    },

    //-------------------------- 获取一级分类 根据后台API传参 ------------------------------
    getCategory() {
      // VueX 封装管理接口 页面调用
      this.$store.dispatch("common/getCategory").then(response => {
        this.category.item = response;
      });
    },
    //-------------------------- 获取全部分类 根据后台API传参 ------------------------------
    getCategoryAll() {
      GetCategoryAll().then(response => {
        let responseData = response.data.data;
        this.category.item = responseData;
        console.log(this.category_item.children.id)
      });
    },
    //-------------------------- 删除一级分类（confirm提示对话框） ------------------------------
    // categoryID接收传参 deleteCategoryConfirm(firstItem.id)
    deleteCategoryConfirm(categoryID) {
      // 把接收的传参 存到 deleteId变量里 使其可以在deleteCategory()方法里面调用其变量
      this.deleteId = categoryID;
      // 使用全局的confirm提示  来自global.js
      this.confirm({
        content: "确认删除当前信息，确认后无法恢复！！",
        tip: "警告",
        // 点击确定 调用删除接口
        fn: this.deleteCategory,
        // 点击取消 清空this.deleteId 防止下次点击删除取消出问题
        catchFn: function() {
          this.deleteId = "";
        }
      });
    },
    //-------------------------- 删除一级分类 ------------------------------
    deleteCategory() {
      // 调用删除一级分类接口 根据后台API传参
      DeleteCategory({ categoryId: this.deleteId })
        .then(response => {
          // ES6 findIndex 查找数据索引
          let index = this.category.item.findIndex(
            item => item.id == this.deleteId
          );
          // 删除数组指定元素   注： splice(指定开始位置, 删除的数量, 替换新数据[])
          this.category.item.splice(index, 1);
        })
        .catch(error => {});
    },
    //-------------------------- 修改一级分类 ------------------------------
    editCategory(params) {
      this.submit_button_type = params.type;
      this.category_first_input = true;
      this.category_first_disabled = false;
      this.category_children_input = false;
      this.submit_button_disabled = false;
      // 一级分类名称输入 通过categoryName = firstItem.category_name 传参赋值还原名称
      this.form.categoryName = params.data.category_name;
      // 存储当前数据对象
      this.category.current = params.data;
    },
    editFirstCategory() {
      // 当输入框为空 Message提示框
      if (this.category.current.length == 0) {
        this.$message({
          message: "未选择分类！！",
          type: "error"
        });
        return false;
      }
      // 传参格式
      let requestData = {
        id: this.category.current.id,
        categoryName: this.form.categoryName
      };
      // 调用修改一级分类接口 根据后台API传参
      EditCategory(requestData)
        .then(response => {
          let responseData = response.data.data.data;
          this.$message({
            message: response.data.message,
            type: "success"
          });

          this.category.current.category_name = responseData.categoryName;
          // 清空输入框
          this.form.categoryName = "";
          this.category.current = [];
        })
        .catch(error => {});
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/config.scss";
.category-wrap {
  div:first-child {
    &:before {
      top: 20px;
    }
  }
  div:last-child {
    &:before {
      bottom: 21px;
    }
  }
}
.menu-title {
  line-height: 44px;
  padding-left: 22px;
  background-color: #f3f3f3;
}
.category {
  position: relative;
  line-height: 44px;
  cursor: pointer;
  &:before {
    content: "";
    position: absolute;
    left: 22px;
    top: 0;
    bottom: 0;
    width: 32px;
    border-left: 1px dotted #000;
  }
  h4 {
    padding-left: 40px;
  }
  svg {
    position: absolute;
    left: 15px;
    top: 15px;
    background-color: #fff;
  }
  li {
    position: relative;
    padding-left: 36px;
    margin-left: 24px;
    &:before {
      content: "";
      position: absolute;
      left: 0;
      top: 22px;
      width: 32px;
      border-bottom: 1px dotted #000;
    }
  }
  li,
  h4 {
    &:hover {
      @include webkit(transition, all 0.5s ease 0s);
      background-color: #f3f3f3;
      .button-group {
        display: block;
      }
    }
  }
}
.button-group {
  display: none;
  position: absolute;
  right: 11px;
  top: 0;
  font-size: 12px;
}
.form-wrap {
  padding-top: 30px;
  width: 410px;
}
.hr-e9e9e9 {
  width: calc(100% + 60px);
  margin-left: -30px;
  border: none;
  margin: 30px 0 30px 0;
  border-bottom: 1px solid #e9e9e9;
}
</style>