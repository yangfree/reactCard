<template>
  <div class="my-header">
    <header class="main">
      <h2>
        <router-link to="/">杨洁个人网站 | 后台管理系统</router-link>
      </h2>
      <div class="user-info">
        <span>{{username}}</span>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "MyHeader",
  created() {
    
  },
  data() {
    return {
      username: sessionStorage.getItem("name") || this.$store.state.name
    };
  }
};
</script>

<style lang='less' scoped>
.my-header {
  border-bottom: 1px solid #ccc;
  .main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-info {
      display: flex;
      width: 45px;
      height: 45px;
      align-items: center;
      justify-content: center;
      background-color: rgba(255, 0, 0, 0.1);
      border-radius: 50%;
      font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
      font-size: 12px;
    }
  }
}
</style>