<template>
  <el-table :data="tableData" border style="width: 100%">
    <!-- 多选框 -->
    <el-table-column v-if="tableConfig.selection" type="selection" width="55"></el-table-column>

    <template v-for="item in tableConfig.tHead">
      <!-- v-slot  判断使用插槽/文本数据渲染 -->
      <el-table-column
        v-if="item.columnType === 'slot'"
        :key="item.field"
        :prop="item.field"
        :label="item.label"
        :width="item.width"
      >
        <!-- slot-scope="scope" 用来读取整行row数据  :name="item.xxxx"对应父组件传参的组件  data动态绑定实现父组件通讯 -->
        <template slot-scope="scope">
          <slot :name="item.slotName" :data="scope.row"></slot>
        </template>
      </el-table-column>
      <!-- 文本数据渲染 -->
      <el-table-column
        v-else
        :key="item.field"
        :prop="item.field"
        :label="item.label"
        :width="item.width"
      ></el-table-column>
    </template>
  </el-table>
</template>

<script>
import { requestUrl } from "../../api/requestUrl";
import { loadTableData } from "../../api/user";
export default {
  name: "TableVue",
  props: {
    config: {
      type: Object, // 自定义接收的值类型
      default: () => {} // 传参类型 当传参没有值的时候 可以自定义默认值
    }
  },
  data() {
    return {
      // table表单
      tableConfig: {
        // 多选框
        selection: true,
        // 翻页记录checkbox
        recordCheckbox: true,
        requestData: {},
        // 表头  对应父组件传参的数据格式
        tHead: []
      },
      // table表单数据
      tableData: [
        {
          email: "123456@qq.com",
          name: "王花花",
          phone: 13856565656,
          address: "广东省",
          role: "超管"
        },
        {
          email: "123456@qq.com",
          name: "张三",
          phone: 13856565656,
          address: "广东省",
          role: "超管"
        }
      ]
    };
  },
  beforeMount() {
    this.initTableConfig();
    this.loadData();
  },
  methods: {
    // 初始化table配置项
    initTableConfig() {
      let configData = this.config;
      let keys = Object.keys(this.tableConfig);
      // 循环出父组件 每个配置项
      for (let key in configData) {
        // 如果有添加的配置项 则与table组件匹配
        if (keys.includes(key)) {
          // ["selection", "recordCheckbox", "requestUrl", "tHead"].includes("selection")
          this.tableConfig[key] = configData[key];
        }
      }
    },
    loadData() {
      // 拿到父组件的 请求接口URL
      let requestJson = this.tableConfig.requestData;

      // 根据后台API传参
      let requestData = {
        url: requestUrl[requestJson.url],
        method: requestJson.method,
        data: requestJson.data
      };
      loadTableData(requestData)
        .then(response => {
          let responseData = response.data.data.data;
          if (responseData && responseData.length > 0) {
            // 赋值渲染页面 （前提是 父组件传的field字段需匹配 ）
            this.tableData = responseData;
          }
        })
        .catch(error => {});
    }
  }
};
</script>

<style lang="scss" scpoed>
</style>