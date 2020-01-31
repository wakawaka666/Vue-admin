<template>
  <div>
    <el-row :gutter="5">
      <el-col :span="4">
        <div class="label-wrap category">
          <label for>分类：</label>
          <div class="wrap-content">
            <el-select v-model="category_value" placeholder="请选择" style="width: 100%;">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
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
              align="right"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00', '08:00:00']"
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
        <el-button type="danger" style="width: 100%;">搜索</el-button>
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
    <el-table :data="table_data" border style="width: 100%">
      <el-table-column type="selection" width="45"></el-table-column>
      <el-table-column prop="title" label="标题" width></el-table-column>
      <el-table-column prop="category" label="类别" width></el-table-column>
      <el-table-column prop="date" label="日期" width></el-table-column>
      <el-table-column prop="user" label="管理员" width></el-table-column>
      <el-table-column label="操作">
        <template slot-scope>
          <el-button size="mini" type="success" @click="dialog_info = true">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteItem">删除</el-button>
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
          :total="1000"
          :page-sizes="[10, 20, 30, 40]"
        ></el-pagination>
      </el-col>
    </el-row>
    <!-- 新增弹窗  父组件通过flag属性 把dialog_info传参给子组件 -->
    <DialogInfo :flag.sync="dialog_info"></DialogInfo>
  </div>
</template>

<script>
// dialog
import DialogInfo from "./dialog/info";
export default {
  name: "infoIndex",
  components: { DialogInfo },
  data() {
    return {
      // 类型
      options: [
        {
          value: "选项1",
          label: "国际信息"
        },
        {
          value: "选项2",
          label: "国内信息"
        },
        {
          value: "选项3",
          label: "行业信息"
        }
      ],
      // 关键字
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
      // 表格数据
      table_data: [
        {
          title:
            "与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；",
          category: "国内信息",
          date: "2019-09-10 19:31:31",
          user: "管理员"
        },
        {
          title:
            "与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；",
          category: "国内信息",
          date: "2019-09-10 19:31:31",
          user: "管理员"
        },
        {
          title:
            "与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；",
          category: "国内信息",
          date: "2019-09-10 19:31:31",
          user: "管理员"
        }
      ],
      // 基础数据
      category_value: "",
      date_value: "",
      search_key: "id",
      search_keyWord: "",
      dialog_info: false
    };
  },
  created() {},
  mounted() {},
  methods: {
    // 页面条数
    handleSizeChange(val) {
      console.log(val);
    },
    // 页码
    handleCurrentChange(val) {
      console.log(val);
    },
    // 单个删除
    deleteItem() {
      this.confirm({
        content: "确认删除当前信息，确认后无法恢复！！",
        type: "info",
        fn: this.confirmDelete,
        id: "1111111"
      })
    },
    // 批量删除
    deleteAll(){
      this.confirm({
        content: "确认删除选择数据，确认后无法恢复！！",
        tip: "警告",
        fn: this.confirmDelete,
        id: "22222222"
      })
    },
    confirmDelete(value){
      console.log(value)
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