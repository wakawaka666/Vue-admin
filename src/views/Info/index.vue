<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for>分类：</label>
          <div class="wrap-content">
            <el-select v-model="category_value" placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in options.category"
                :key="item.id"
                :label="item.category_name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>

      <el-col :span="7">
        <div class="label-wrap date">
          <label for>日期：&nbsp;&nbsp;</label>
          <div class="wrap-content">
            <el-date-picker
              style="width: 100%;"
              v-model="date_value"
              type="datetimerange"
              format="yyyy年MM月dd日 HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </div>
      </el-col>

      <el-col :span="4">
        <div class="label-wrap key-word">
          <label for>关键字：</label>
          <div class="wrap-content">
            <el-select v-model="search_key" style="width: 100%;">
              <el-option
                v-for="item in search_option"
                :key="item.value"
                :value="item.value"
                :label="item.label"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>

      <el-col :span="3">
        <el-input v-model="search_keyWord" placeholder="请输入内容" style="width: 100%;"></el-input>
      </el-col>

      <el-col :span="2">
        <el-button type="danger" style="width: 100%;" @click="search">搜索</el-button>
      </el-col>

      <el-col :span="2">.</el-col>

      <el-col :span="2">
        <el-button
          type="danger"
          class="pull-right"
          style="width: 100%;"
          @click="dialog_info = true"
        >新增</el-button>
      </el-col>
    </el-row>

    <div class="back-space-30"></div>

    <!-- 表格数据 -->
    <el-table
      :data="table_data.item"
      border
      style="width: 100%"
      v-loading="formLoading"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width></el-table-column>
      <el-table-column prop="title" label="标题" width></el-table-column>
      <el-table-column prop="categoryId" label="类型" :formatter="toCategory" width></el-table-column>
      <!-- :formatter="toData" elementUI formatter属性通过 方法来取得返回值 传给页面做渲染 -->
      <el-table-column prop="createDate" label="日期" :formatter="toDate" width></el-table-column>
      <el-table-column prop="user" label="管理员" width></el-table-column>
      <el-table-column label="操作" width="230px">
        <template slot-scope="scope">
          <!-- scope.row.id相当于response里的id -->
          <el-button size="mini" type="success" @click="editInfo(scope.row.id)">编辑</el-button>
          <router-link
            :to="{ name: 'InfoDetail', params:{ id:scope.row.id, title:scope.row.title } }"
            class="margin-left-10 margin-right-10"
          >
            <el-button size="mini" type="success">详情</el-button>
          </router-link>
          <el-button size="mini" type="danger" @click="deleteItem(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="back-space-30"></div>

    <!-- 底部分页 -->
    <el-row>
      <el-col :span="12">
        <el-button size="small" @click="deleteAll">批量删除</el-button>
      </el-col>
      <el-col :span="12">
        <el-pagination
          class="pull-right"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          :page-sizes="[10, 20, 30, 40]"
        ></el-pagination>
      </el-col>
    </el-row>
    <!-- 新增弹窗  父组件通过flag属性 把dialog_info传参给子组件 -->
    <DialogInfo :flag.sync="dialog_info" :category="options.category" @getList="getList()"></DialogInfo>
    <!-- 编辑弹窗  父组件通过flag属性 把dialog_info传参给子组件 -->
    <DialogInfoEdit
      :flag.sync="dialog_info_edit"
      :id="infoId"
      :category="options.category"
      @getList="getList()"
    ></DialogInfoEdit>
  </div>
</template>

<script>
// dialog
import DialogInfo from "./dialog/info";
import DialogInfoEdit from "./dialog/edit";
import { GetList, DeleteInfo } from "../../api/news";
import { timestampToTime } from "../../utils/common";

export default {
  name: "infoIndex",
  components: { DialogInfo, DialogInfoEdit },
  data() {
    return {
      // -------------------类型----------------------
      options: {
        category: []
      },
      // -------------------关键字----------------------
      search_option: [
        {
          value: "id",
          label: "ID"
        },
        {
          value: "title",
          label: "标题"
        }
      ],
      // -------------------表格数据----------------------
      table_data: {
        item: []
      },
      // -------------------基础数据----------------------
      category_value: "", // 分类ID
      date_value: "", // 时间
      search_key: "", // 信息ID
      search_keyWord: "", // 关键词
      dialog_info: false, // dialog新增子组件
      dialog_info_edit: false, // dialog编辑子组件
      infoId: "", // 接收数据id   定义的id属性传给子组件
      total: 0, // 信息条数
      // -------------------页码----------------------
      page: {
        pageNumber: 1,
        pageSize: 10
      },
      // -------------------交互Loading----------------------
      formLoading: false,
      // -------------------删除分类信息id----------------------
      deleteInfoId: ""
    };
  },
  created() {},
  mounted() {
    this.getCategory();
    this.getList();
  },

  methods: {
    // --------------------获取分类--------------------------
    getCategory() {
      // VueX 封装管理接口 页面调用
      this.$store.dispatch("common/getCategory").then(response => {
        this.options.category = response;
      });
    },
    // -------------------页码/页面条数----------------------
    handleSizeChange(val) {
      this.page.pageSize = val;
    },
    handleCurrentChange(val) {
      this.page.pageNumber = val;
      this.getList();
    },
    // -------------------单个删除----------------------
    deleteItem() {
      this.confirm({
        content: "确认删除当前信息，确认后无法恢复！！",
        type: "info",
        fn: this.confirmDelete
      });
    },
    // -------------------批量删除----------------------
    deleteAll() {
      if (!this.deleteInfoId || this.deleteInfoId.length == 0) {
        this.$message({
          message: "请选择要删除的数据！！",
          type: "error"
        });
        return false;
      }
      this.confirm({
        content: "确认删除选择数据，确认后无法恢复！！",
        tip: "警告",
        fn: this.confirmDelete
      });
    },
    // 搜索
    search() {
      let data = this.formatData();
      this.getList();
    },
    // -------------------搜索条件处理----------------------
    formatData() {
      let data = {
        pageNumber: this.page.pageNumber,
        pageSize: this.page.pageSize
      };
      // 分类ID
      if (this.category_value) {
        data.categoryId = this.category_value;
      }
      // 日期
      if (this.date_value) {
        data.startTime = this.date_value[0];
        data.endTime = this.date_value[1];
      }
      // 标题
      if (this.search_keyWord) {
        data.id = this.search_keyWord;
      }
      return data;
    },
    // -------------------获取列表----------------------
    getList() {
      // 获取列表打开Loading
      this.formLoading = true;
      // 根据后台API传参
      let requestData = this.formatData();
      // 调用获取列表接口
      GetList(requestData)
        .then(response => {
          let data = response.data.data;
          // 更新数据
          this.table_data.item = data.data;
          // 页面条数统计
          this.total = data.total;
          // 请求成功关闭Loading
          this.formLoading = false;
        })
        .catch(error => {
          this.formLoading = false;
        });
    },
    // -------------------时间日期----------------------
    // element-ui文档formatter属性 方法传参
    toDate(row, column, cellValue) {
      // 通过时间戳转时间方法传参计算出返回值 → toDate → formatter属性
      return timestampToTime(row.createDate);
    },
    // -------------------分类名称----------------------
    toCategory(row) {
      // 定义变量存入每条数据
      let categoryId = row.categoryId;

      // 通过filter 根据id过滤查找对应类别
      let categoryData = this.options.category.filter(
        item => item.id == categoryId
      )[0];

      return categoryData.category_name;
    },
    // -------------------单个删除分类信息----------------------
    deleteItem(id) {
      // 存入变量 后台APi传参格式为[]
      this.deleteInfoId = [id];
      console.log(this.deleteInfoId);

      this.confirm({
        content: "确认删除选择数据，确认后无法恢复！！",
        tip: "警告",
        fn: this.confirmDelete
      });
    },
    // 确认删除
    confirmDelete(value) {
      // 根据后台API传参
      let requestData = {
        id: this.deleteInfoId
      };
      // 调用删除分类信息接口
      DeleteInfo(requestData)
        .then(response => {
          this.deleteInfoId = "";
          // 删除后重新获取表单
          this.getList();
        })
        .catch(error => {});
    },
    // -------------------批量删除分类信息----------------------
    handleSelectionChange(val) {
      // 循环出表单上 选中的每条分类信息id
      let id = val.map(item => item.id);
      // 存入变量
      this.deleteInfoId = id;
    },
    editInfo(id) {
      this.infoId = id;
      this.dialog_info_edit = true;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/config.scss";
.label-wrap {
  &.category {
    @include labelDom(left, 60, 40);
  }
  &.date {
    @include labelDom(right, 93, 40);
  }
  &.key-word {
    @include labelDom(right, 93, 40);
  }
}
</style>