<template>
  <div class="my-header">
    <header class="main">
      <h1>杨洁个人网站 | 后台管理系统</h1>
      <div class="user-info">
        <div class="avatar">
          <img src alt="头像" />
        </div>
        <span>name</span>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: "MyHeader"
};
</script>

<style lang='less' scoped>
.my-header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  .main {
    max-width: 1260px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .user-info {
      display: flex;
      align-items: center;
    }
  }
}
</style>