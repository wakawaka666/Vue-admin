<template>
  <div id="login">
    <!------------ menu-tab -------------->
    <div class="login-wrap">
      <ul class="menu-tab">
        <!-- v-for循环标题  :class标题动态高光 @click事件控制动态高光-->
        <li
          v-for="item in menuTab"
          :key="item.id"
          :class="{'current': item.current}"
          @click="toggleMenu(item)"
        >{{item.text}}</li>
      </ul>
      <!------------- login-form ---------------->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        class="login-form"
        size="medium"
      >
        <el-form-item prop="username">
          <!-- label有个属性for 可以与input做绑定（加上id） 当点击label标题光标可以显示在绑定的input上 -->
          <label for="username">用户名</label>
          <el-input id="username" type="text" v-model="ruleForm.username" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <label>密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password"
            minlength="6"
            maxlength="20"
            auto-complete="off"
          ></el-input>
        </el-form-item>

        <!-- 添加model做布尔值判断 true为显示 -->
        <el-form-item prop="passwords" v-if="model === 'register'">
          <label>重复密码</label>
          <el-input
            type="password"
            v-model="ruleForm.passwords"
            minlength="6"
            maxlength="20"
            auto-complete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <label>验证码</label>
          <el-row :gutter="20">
            <el-col :span="14">
              <el-input v-model="ruleForm.code" minlength="6" maxlength="6"></el-input>
            </el-col>
            <el-col :span="10">
              <el-button
                type="success"
                class="block"
                @click="getSms()"
                :disabled="codeButtonStatus.status"
              >{{codeButtonStatus.text}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('loginForm')"
            class="login-btn block"
            :disabled="loginButtonStatus"
          >{{ model === "login" ? "登录" : "注册" }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
//引入js-sha1加密
import sha1 from "js-sha1";

// 从reques.js拦截器 到Login.js请求地址 再到这边的触发调用
import { GetSms, Register, Login } from "../../api/login.js";

// 导入 过滤特殊字符 验证邮箱 验证密码 验证验证码 工具
import {
  stripscript,
  validateEmail,
  validatePass,
  validateVcode
} from "../../utils/validate.js";
export default {
  name: "login",
  data() {
    // ---------------login-form----------------
    // 用户名验证
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validateEmail(value)) {
        callback(new Error("用户名格式不正确"));
      } else {
        callback();
      }
    };

    // 密码验证
    var validatePassword = (rule, value, callback) => {
      // 过滤特殊字符后的数据
      this.ruleForm.password = stripscript(value);
      value = this.ruleForm.password;

      if (value === "") {
        callback(new Error("请输入验密码"));
      } else if (validatePass(value)) {
        callback(new Error("密码为6-20位数字+字母"));
      } else {
        callback();
      }
    };

    // 验证重复密码
    var validatePasswords = (rule, value, callback) => {
      // 过滤特殊字符后的数据
      this.ruleForm.passwords = stripscript(value);
      value = this.ruleForm.passwords;

      if (value === "") {
        callback(new Error("请再次输入验密码"));
      } else if (value != this.ruleForm.password) {
        callback(new Error("重复密码不正确"));
      } else {
        callback();
      }
    };

    // 验证码验证
    var validateCode = (rule, value, callback) => {
      // 过滤特殊字符后的数据
      this.ruleForm.code = stripscript(value);
      value = this.ruleForm.code;

      if (value === "") {
        callback(new Error("请输入验证码"));
      } else if (validateVcode(value)) {
        callback(new Error("验证码格式不正确"));
      } else {
        callback();
      }
    };

    return {
      // -----------------menu-tab------------------
      menuTab: [
        // 添加current 登录默认高光
        { text: "登录", current: true, type: "login" },
        { text: "注册", current: false, type: "register" }
      ],
      // 通过toggleMenu里的model传过来的模块值
      model: "login",
      // 登录按钮是否为禁用状态
      loginButtonStatus: true,

      // // 验证码按钮状态 false(默认启用状态) 当点击获取验证码后定时器时间内为 true(禁用状态)
      // codeButtonStatus: false,
      // // 验证码按钮文本内容 默认状态
      // codeButtonText: "获取验证码",

      // 验证码按钮状态及文本内容放到 codeButtonStatus对象里  原理同上注释
      codeButtonStatus: {
        status: false,
        text: "获取验证码"
      },

      timer: null,

      // ----------------login-form------------------
      ruleForm: {
        username: "",
        password: "",
        passwords: "",
        code: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        passwords: [{ validator: validatePasswords, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }]
      }
    };
  },

  created() {},
  //挂在完成后自动执行的
  mounted() {},

  methods: {
    // -------------------登录/注册模块----------------------
    // data拿到每条item数据
    toggleMenu(data) {
      // 循环menuTab里的数组 current设置为false  ES6写法
      this.menuTab.forEach(elem => {
        elem.current = false;
      });
      // 点击后的数组高光
      data.current = true;
      // 登录注册按钮模块值传给model
      this.model = data.type;
      // 清空重置表单数据
      this.clearFormData();
      // 重置获取验证码按钮元素
      this.clearCountDown();
    },

    // -------------------清除表单数据------------------------
    clearFormData() {
      this.$refs.loginForm.resetFields();
    },

    // -------------------更新按钮状态------------------------
    updateButtonStatus(params) {
      // params把一个对象给传参进来
      this.codeButtonStatus.status = params.status;
      this.codeButtonStatus.text = params.text;
    },

    // ---------------------获取验证码------------------------
    getSms() {
      // 进行提示 前端对响应数据拦截 校验邮箱为空
      if (this.ruleForm.username == "") {
        this.$message.error("邮箱不能为空！！");
        return false;
      }
      // 进行提示 前端对响应数据拦截 校验邮箱格式不正确
      if (validateEmail(this.ruleForm.username)) {
        this.$message.error("邮箱格式有误， 请重新输入！！");
        return false;
      }

      // 传参请求
      let requestData = {
        username: this.ruleForm.username,
        module: this.model
      };

      // 修改获取验证码按钮状态
      this.updateButtonStatus({
        status: true,
        text: "发送中"
      });

      // 延迟1S 开始请求
      setTimeout(() => {
        GetSms(requestData)
          .then(response => {
            // 请求成功后 element-ui弹窗
            let data = response.data;
            this.$message({
              message: data.message,
              type: "success"
            });
            // 请求成功后 启用登录/注册按钮
            this.loginButtonStatus = false;
            // 调用定时器 设置倒计时再重新获取验证码
            this.countDown(60);
          })
          .catch(error => {
            console.log(error);
          });
      }, 1000);
    },

    // -------------------提交表单----------------------------
    submitForm(formName) {
      console.log(this.model);

      this.$refs[formName].validate(valid => {
        //表单验证通过
        if (valid) {
          // 判断 登录/注册的提交按钮来调用 登录/注册的接口 使用三目运算符
          this.model === "login" ? this.login() : this.register();
          // if (this.model === "login") {
          //   this.login();
          // } else {
          //   this.register();
          // }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    // -------------------登录--------------------------------
    login() {
      // 把表单上填好的参数都传到 登录后台接口的固定格式
      let requestData = {
        username: this.ruleForm.username,
        password: sha1(this.ruleForm.password),
        code: this.ruleForm.code
      };
      // 调用action里的异步请求login()
      this.$store.dispatch('app/login', requestData).then(response => {
          // 请求成功后 element-ui弹窗
          let data = response.data;
          this.$message({
            message: data.message,
            type: "success"
          });
          // 跳转后台界面
          this.$router.push({
            name: 'console'
          })
        })
        .catch({});
        
      // // 调用login.js接口的方法及传参 .then当调用成功后
      // Login(requestData)
      //   .then(response => {
      //     // 请求成功后 element-ui弹窗
      //     let data = response.data;
      //     this.$message({
      //       message: data.message,
      //       type: "success"
      //     });
      //     // 跳转后台界面
      //     this.$router.push({
      //       name: 'console'
      //     })
      //   })
      //   .catch({});
    },

    // -------------------注册--------------------------------
    register() {
      // 把表单上填好的参数都传到 注册后台接口的固定格式
      let requestData = {
        username: this.ruleForm.username,
        password: sha1(this.ruleForm.password),
        code: this.ruleForm.code,
        module: "register"
      };

      // 调用login.js接口的方法及传参 .then当调用成功后
      Register(requestData)
        .then(response => {
          // 请求成功后 element-ui弹窗
          let data = response.data;
          this.$message({
            message: data.message,
            type: "success"
          });
          // 模拟注册成功 自动跳转到登录页 因为menuTab是从toggleMenu方法里循环出来的 所以只需要传参 menuTab索引为0的第一条数据
          this.toggleMenu(this.menuTab[0]);
          this.clearCountDown();
        })
        .catch(error => {});
    },

    // -------------------倒计时------------------------------
    countDown(number) {
      // 一开始判定定时器是否存在 存在则清除
      if (this.timer) {
        clearInterval(this.timer);
      }

      let time = number;
      this.timer = setInterval(() => {
        time--;
        // 显示倒计时按钮状态
        this.codeButtonStatus.text = `倒计时${time}秒`; //ES6写法   ES5写法：'倒计时'+ time +'秒'
        // 到 0 改变验证码按钮状态
        if (time === 0) {
          clearInterval(this.timer);
          // 修改获取验证码按钮状态
          this.updateButtonStatus({
            status: false,
            text: "再次获取"
          });
        }
      }, 1000);
    },

    // -------------------重置倒计时按钮元素--------------------
    // 当注册完成后跳转登录
    clearCountDown() {
      // 修改获取验证码按钮状态
      this.updateButtonStatus({
        status: false,
        text: "获取验证码"
      });
      clearInterval(this.timer);
    }
  }
};
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    // 鼠标移上变成可点击
    cursor: pointer;
  }
  .current {
    background: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  margin-top: 29px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #fff;
  }
  .item-from {
    margin-bottom: 13px;
  }
  .block {
    display: block;
    width: 100%;
  }
  .login-btn {
    margin-top: 19px;
  }
}
</style>