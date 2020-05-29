<template>
  <div class="my-login">
    <div class="content">
      <el-row>
        <el-col :span="8" :offset="8">
          <h2>登陆输入框</h2>
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="50px"
            class="demo-ruleForm"
          >
            <el-form-item label="Name" prop="name">
              <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Passw" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item class="btn-bottom">
              <el-button type="danger" @click="changeInput(loginShow)">忘记密码</el-button>
              <el-button type="primary" @click="submitForm">提交</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { userLogin } from "@/api/api.js";

export default {
  name: "ForgetPassword",
  props: {
    loginShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    const validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入名称"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        name: "",
        pass: ""
        // checkPass: ""
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }]
        // checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    changeInput() {
      this.$emit("hideLogin", this.loginShow);
    },
    submitForm() {
      // console.log(this.$refs);
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          userLogin("", this.ruleForm)
            .then(res => {
              if (res.status === 1 && res.message === "ok") {
                // 清空登陆框
                this.ruleForm.name = "";
                this.ruleForm.pass = "";
                this.$store.dispatch('setName', res.user_name);
                this.$store.dispatch('setToken', res.token);
                // console.log(this.$store);
                console.log(res);
                this.$router.push({
                  path: "/home"
                });
              } else if (res.status === 2 && res.message === "密码错误") {
                this.$message({
                  message: "密码错误",
                  type: "error"
                });
              } else {
                this.$message({
                  message: "账号不存在",
                  type: "error"
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang='less' scoped>
.my-login {
  .content {
    h2 {
      text-align: center;
      line-height: 60px;
      border-bottom: 1px solid #ccc;
    }
    .btn-bottom {
      text-align: right;
    }
  }
}
</style>