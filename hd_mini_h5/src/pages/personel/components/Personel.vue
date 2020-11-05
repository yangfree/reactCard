<template>
  <div class="login-box">
    <!-- <h2>登陆</h2> -->
    <van-form @submit="login">
      <!-- <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />

      <div class="change-router">
        <van-tag type="primary" @click="goRegister">去注册</van-tag>
        <van-tag type="primary" @click="goForgetPass">忘记密码?</van-tag>
      </div>

      <div style="margin: 16px;">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div> -->
    </van-form>
  </div>
</template>

<script>
import {
  loginUrl,
  Client_Id,
  Client_Secret,
  Grant_Type,
  Scope
} from "../url/index";
import ajax from "@/api/ajaxRequest";
import qs from "qs";
import md5 from "md5";

export default {
  name: "LoginTem",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      let datas = {
        username: this.username,
        password: md5(this.password),
        grant_type: Grant_Type,
        client_id: Client_Id,
        scope: Scope[0],
        client_secret: Client_Secret
      };
      console.log(datas);
      return false;
      ajax.request({
        url: loginUrl,
        method: "post",
        data: qs.stringify(datas),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
    },
    goRegister() {
      this.$router.push("/register");
    },
    goForgetPass() {
      this.$router.push("/password");
    }
  }
};
</script>

<style lang="" scoped></style>
