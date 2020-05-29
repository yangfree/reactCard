<template>
  <div class="forget-password">
    <div class="content">
      <el-row>
        <el-col :span="8" :offset="8">
          <h2>忘记密码输入框</h2>
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="60px"
            class="demo-ruleForm"
          >
            <el-form-item label="Name" prop="name">
              <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Passw" prop="pass">
              <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="Confirm" prop="checkPass">
              <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item class="btn-bottom">
              <el-button type="success" @click="backLogin">登陆</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
              <el-button type="primary" @click="submitForm">提交</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { forgetPass } from "@/api/api.js";

export default {
  name: "ForgetPassword",
  props: {
    passwordShow: {
      type: Boolean,
      default: false
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
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        pass: "",
        checkPass: ""
      },
      rules: {
        name: [{ validator: validateName, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    backLogin() {
      this.$emit("backLogin", this.passwordShow);
    },
    submitForm() {
      this.$refs["ruleForm"].validate(valid => {
        if (valid) {
          forgetPass("", this.ruleForm)
            .then(res => {
              if (res.nModified === 1) {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.ruleForm.name = "";
                this.ruleForm.pass = "";
                this.ruleForm.checkPass = "";
              } else {
                this.$message({
                  message: "用户名不正确",
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
    },
    resetForm() {
      this.$refs["ruleForm"].resetFields();
    }
  }
};
</script>

<style lang='less' scoped>
.forget-password {
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