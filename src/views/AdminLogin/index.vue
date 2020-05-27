<template>
  <div class="my-login">
    <div class="login-content">
     <template v-if="loginShow">
      <MyLogin @hideLogin='hideLogin' :loginShow='loginShow' />
     </template>
     <template v-if="passwordShow">
       <ForgetPassword @backLogin='backLogin' :passwordShow='passwordShow'/>
     </template>
    </div>
  </div>
</template>

<script>
import MyLogin from './login';
import ForgetPassword from './forgetPassword';

export default {
  name: "AdminLogin",
  components: {
    MyLogin,
    ForgetPassword
  },
  data() {
    return {
     loginShow: true,
     passwordShow: false
    };
  },
  methods: {
    backLogin(){
      this.loginShow = true;
      this.passwordShow = false;
    },
    hideLogin(){
      this.loginShow = false;
      this.passwordShow = true;
    }
  }
};
</script>

<style lang='less' scoped>
.my-login {
  .login-content {
    margin-top: 20%;
  }
}
</style>