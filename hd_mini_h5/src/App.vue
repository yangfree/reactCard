<template>
  <div id="app">
    <div class="des">这是一个演示页面</div>
    <div id="nav">
      <ul>
        <li>01: 预约中</li>
        <li>02: 待确认</li>
        <li>03: 待会诊</li>
        <li>04: 待开方</li>
        <li>10: 结束</li>
      </ul>
      <!-- <router-link to="/">Home</router-link> -->
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o">
          <a href="./personel.html">个人中心</a>
        </van-tabbar-item>
        <van-tabbar-item icon="search">
          <a href="./doctor.html">医生页面</a>
        </van-tabbar-item>
        <van-tabbar-item icon="friends-o">
          <a href="./experts.html">专家页面</a>
        </van-tabbar-item>
        <van-tabbar-item icon="setting-o">
          <a href="./patients.html">患者页面</a>
        </van-tabbar-item>
        <van-tabbar-item icon="fire-o">
          <a href="./medical.html">医助页面</a>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Tabbar, TabbarItem } from "vant";
// import ajax from "@/api/ajaxRequest.js";
// import qs from "qs";

Vue.use(Tabbar);
Vue.use(TabbarItem);

export default {
  data() {
    return {
      active: 0
    };
  }
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  .des {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    color: red;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .des {
    animation: identifier 1s linear infinite;
  }
}

@keyframes identifier {
  from {
    opacity: 0;
    color: #fff;
  }
  to {
    opacity: 1;
    color: red;
  }
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
