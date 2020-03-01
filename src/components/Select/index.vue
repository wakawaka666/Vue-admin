<template>
  <div>
    <el-select v-model="data.selectValue">
      <el-option
        v-for="item in data.initOption"
        :key="item.id"
        :value="item.value"
        :label="item.label"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "SelectVue",
  props: {
    config: {
      type: Array,
      default: () => []
    }
  },
  watch:{
    // 监听config变量 在页面dom元素渲染之前加载完成数据 不需要再mounted里边二次加载数据   beforeCreate → watch → create → beforeMounted → mounted
    config:{
      handler(newValue, oldValue){
        this.initOption()
      },
      immediate: true
    }
  },
  data() {
    return {
      data: {
        selectValue: "name",
        initOption: [],
        option: [
          { value: "name", label: "姓名" },
          { value: "phone", label: "手机号" },
          { value: "email", label: "邮箱" }
        ]
      }
    };
  },
  created() {},
  mounted() {
  },
  methods: {
      // 循环 匹配 赋值数据
    initOption() {
      let optionArr = [];
      this.config.forEach(item => {  // 循环父组件传过来的configOption（相当于key）
        let arr = this.data.option.filter(elem => elem.value == item)[0]; // filter匹配成功后是一个数组，需要取下标第一个
        optionArr.push(arr);
      });
      // 初始化赋值
      this.data.initOption = optionArr;
      // 初始化搜索类型
      this.data.selectValue = optionArr[0].value;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>