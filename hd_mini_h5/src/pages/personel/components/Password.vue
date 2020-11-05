<template>
  <div class="password">
    <!-- <h2>忘记密码</h2> -->
    <van-form @submit="submitPassword">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="请输入用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />

      <van-field
        v-model="sms"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
      >
        <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
        </template>
      </van-field>

      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />

      <van-field
        v-model="conPass"
        type="password"
        name="密码"
        label="确认密码"
        placeholder="请输入确认密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />

      <div class="change-router">
        <van-tag type="primary" @click="goLogin">去登陆</van-tag>
        <van-tag type="primary" @click="goRegister">去注册</van-tag>
      </div>

      <div style="margin: 16px;">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  name: "Password",
  data() {
    return {
      username: "",
      password: "",
      sms: "",
      conPass: ""
    };
  },
  methods: {
    submitPassword(values) {
      console.log("submit", values);
    },
    //跳回主页登陆
    goLogin() {
      this.$router.push("/");
    },
    //跳去注册页面
    goRegister() {
      this.$router.push("/register");
    }
  }
};
</script>

<style lang="less" scoped></style>
