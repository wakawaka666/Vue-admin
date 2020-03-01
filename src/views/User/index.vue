<template>
  <div>
    <el-row>
      <el-col :span="20">
        <div class="label-wrap">
          <label>关键字</label>
          <div class="wrap-content">
            <el-row :gutter="16">
              <el-col :span="4">
                <SelectVue :config="data.configOption"></SelectVue>
              </el-col>
              <el-col :span="5">
                <el-input placeholder="请输入搜索内容"></el-input>
              </el-col>
              <el-col :span="14">
                <el-button type="primary">搜索</el-button>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="4">
        <el-button type="danger" class="pull-right">添加用户</el-button>
      </el-col>
    </el-row>
    <div class="back-space-30"></div>
    <TableVue :config="data.configTable">
      <!-- v-slot:插槽名="子组件返回整行的数据" -->
      <template v-slot:status="slotData">
        <slot>
          <!-- data对应子组件动态绑定的数据 -->
          <el-switch v-model="slotData.data.name" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </slot>
      </template>

      <template v-slot:operation="slotData">
        <slot>
          <el-button size="smaill" type="primary" @click="operation(slotData.data)">编辑</el-button>
          <el-button size="smaill" type="danger" @click="operation(slotData.data)">删除</el-button>
        </slot>
      </template>
    </TableVue>
  </div>
</template>

<script>
import SelectVue from "../../components/Select/index";
import TableVue from "../../components/Table/index";
export default {
  name: "userIndex",
  components: { SelectVue, TableVue },
  data() {
    return {
      data: {
        // 下拉菜单
        configOption: ["name", "phone", "email"],
        // table表单
        configTable: {
          // 多选框
          selection: false,
          // 翻页记录checkbox
          recordCheckbox: true,
          // 表头
          tHead: [
            {
              label: "邮箱/用户名",
              field: "title"
            },
            {
              label: "真实姓名",
              field: "name"
            },
            {
              label: "手机号",
              field: "phone"
            },
            {
              label: "地区",
              field: "address"
            },
            {
              label: "角色",
              field: "role"
            },
            {
              label: "禁启用状态",
              field: "status",
              // 定义插槽类型为slot 子组件才会渲染slot模板
              columnType: "slot",
              // 自定义插槽名称
              slotName: "status"
            },
            {
              label: "操作",
              width: 200,
              // 定义插槽类型为slot 子组件才会渲染slot模板
              columnType: "slot",
              // 自定义插槽名称
              slotName: "operation"
            }
          ],
          // 请求接口URL
          requestData: {
            url: "getUserList",
            method: "post",
            data: {
              pageNumber: 1,
              pageSize: 10
            }
          }
        }
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    operation(params) {
      console.log(params);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/config.scss";
.label-wrap {
  @include labelDom(left, 60, 40);
}
</style>