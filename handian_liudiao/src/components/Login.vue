<template>
  <div>
    <h1 class="main-title">
      <i class="fa fa-envira" style="color:green"></i>
      中医妇科临床流调数据中心
    </h1>
    <hr class="my-hr" :style="{ background: (showLogin?'#409EFF':'#C16050')}" />
    
    <el-form
      :model="loginForm"
      :rules="rules"
      ref="loginForm"
      label-position="left"
      label-width="0px"
      v-if="showLogin"
      class="login-container"
    >
      <h2 class="title">系统登录</h2>
      <el-form-item prop="email">
        <el-input
          type="text"
          v-model="loginForm.email"
          @keyup.enter.native="handleSubmit"
          auto-complete="off"
          placeholder="账号"
          suffix-icon="fa fa-user"
        ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          v-model="loginForm.password"
          @keyup.enter.native="handleSubmit"
          auto-complete="off"
          placeholder="密码"
          suffix-icon="fa fa-lock"
        ></el-input>
      </el-form-item>
      <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
      <el-form-item style="width:100%;">
        <el-button
          type="primary"
          style="width:100%;border-radius:2px"
          @click="handleSubmit"
          :loading="logining"
        >登录</el-button>
      </el-form-item>
      <el-divider content-position="center">
        <span style="color:rgb(94,143,189)">
          友情提示
          <i class="fa fa-wrench"></i>
        </span>
      </el-divider>
      <div>
        <h4 class="my-font">为了保证用户使用功能正常，要求使用如下浏览器:</h4>
        <ul class="my-ul">
          <li class="my-li">
            谷歌浏览器
            <a href="https://www.google.cn/chrome/index.html">
              <i class="fa fa-chrome fa-lg" aria-hidden="true"></i>
            </a>
          </li>
          <li class="my-li">
            火狐浏览器
            <a href="http://www.firefox.com.cn/download/">
              <i class="fa fa-firefox fa-lg" aria-hidden="true"></i>
            </a>
          </li>
          <li class="my-li">
            <p>暂不支持IE及其它浏览器</p>
          </li>
        </ul>
      </div>
    </el-form>

    <el-form
      :model="resetForm"
      :rules="rules"
      ref="resetForm"
      label-position="left"
      label-width="0px"
      v-else
      class="login-container"
    >
      <h2 class="title" style="color:#C16050">找回密码</h2>
      <p>请输入您的邮箱，系统会向该邮箱发送验证信息</p>
      <el-form-item prop="email">
        <el-input
          type="text"
          v-model="resetForm.email"
          auto-complete="off"
          placeholder="账号"
          suffix-icon="fa fa-envelope"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          style="width:100%;background:#C16050;border:1px solid #C16050;"
          @click="handleSubmit2"
        >发送</el-button>
      </el-form-item>
    </el-form>
    <!-- </transition> -->

    <div class="bottom-bar" :style="{ background: (showLogin?'#409EFF':'#C16050')}">
      <el-row>
        <el-col :span="12">
          <div class="left">
            <el-button type="text" @click="showLogin=!showLogin">
              <i class="fa fa-long-arrow-left"></i>
              {{showLogin ? '忘记密码':'返回登录'}}
            </el-button>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="right">
            <el-button type="text" @click="help">
              系统帮助
              <i class="fa fa-long-arrow-right"></i>
            </el-button>
          </div>
        </el-col>
      </el-row>
    </div>

    <br />
    <div style="text-align:center;font-size:18px">
      本项目由
      <span :style="{ color: (showLogin?'#409EFF':'#C16050')}">中华中医药学会妇科分会</span>发起，
      <a
        href="http://www.hantien.com.cn"
        :style="{ color: (showLogin?'#409EFF':'#C16050')}"
      >北京汉典制药有限公司</a>
      <sup>®</sup>支持
    </div>
  </div>
</template>

<script>
import { apiLogin, apiHome, apiSendEmail } from "@/api/api-common";
export default {
  data() {
    return {
      showLogin: true,
      logining: false,
      loginForm: {
        email: "",
        password: ""
      },
      resetForm: {
        email: "",
        password: ""
      },
      rules: {
        email: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      checked: true
    };
  },
  methods: {
    handleSubmit(ev) {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.logining = true;
          var params = {
            email: this.loginForm.email,
            password: this.loginForm.password
          };
          apiLogin(params).then(res => {
            this.logining = false;
            if (res.code !== 200) {
              this.$message({
                message: res.msg + " 密码或用户名错误",
                type: "error"
              });
            } else {
              this.$message({ message: "登录成功", type: "success" });
              apiHome(params)
                .then(home_res => {
                  // sessionStorage 这一行务必写在跳转页面前面!!!!!! 注意使用JSON.stringify()
                  sessionStorage.setItem(
                    "userinfo",
                    JSON.stringify(home_res.data.userinfo)
                  );
                  this.$router.push({ path: "/home" });
                })
                .catch(err => {
                  console.log(err);
                });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleSubmit2(ev) {
      this.$refs.resetForm.validate(valid => {
        if (valid) {
          var params = { email: this.resetForm.email };
          apiSendEmail(params).then(res => {
            console.log("数据", res.msg);
            if (res.msg) {
              this.$message({
                message: res.msg,
                type: "success",
                showClose: true
              });
            } else {
              this.$message({
                message: res.error,
                type: "error",
                showClose: true
              });
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    help() {
      this.$router.push({ path: "/help" });
    }
  }
};
</script>

<style lang="scss" scoped>
$color-login: #409eff;
$color-reset: #c16050;
.main-title {
  text-align: center;
  margin: 10px auto;
  // margin: 150px 20px 20px 20px;
  // font-family: Helvetica, Tahoma, Arial, "Heiti SC", "Microsoft YaHei", sans-serif;
  font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 30px;
  font-weight: lighter;
  color: black;
}
.my-hr {
  width: 400px;
  height: 2px;
  border: none;
  background: $color-login;
  margin-bottom: 20px;
}
.my-font {
  font-size: 15px;
  font-weight: lighter;
  font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
}
.my-ul {
  text-align: center;
  padding-left: 0px;
  list-style-type: none;
  .my-li {
    margin-top: 9px;
    margin-bottom: 9px;
  }
}
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 10px auto 0px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;

  .title {
    margin: 0px auto 20px auto;
    font-weight: lighter;
    text-align: center;
    color: $color-login;
  }

  .remember {
    margin: 0px 0px 35px 0px;
  }
}
.bottom-bar {
  -webkit-border-radius: 5px;
  border-radius: 0px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: 0px auto;
  width: 350px;
  padding: 5px 35px 5px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  background: $color-login;
  .el-button--text {
    color: white;
    padding-block-start: 0px;
    padding-block-end: 0px;
  }
  .left {
    text-align: left;
  }
  .right {
    text-align: right;
  }
}
.el-button--btn-send {
  background: $color-reset;
  border: 1px solid $color-reset;
}
</style>
