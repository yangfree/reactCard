<template>
  <div class="home">
    <!-- <h2>杨洁个人网站后台管理系统</h2> -->
    <!-- TODO: 切换在一个盒子之内完成,不要跳转页面 -->
    <el-container>
      <el-header>
        <MyHeader />
      </el-header>
      <el-container>
        <el-aside width="200px">
          <MyNav />
        </el-aside>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
      <!-- <el-footer>
        <MyFooter />
      </el-footer> -->
    </el-container>
  </div>
</template>

<script>
import MyNav from "../components/MyNav";
import MyHeader from "../components/MyHeader";
import MyFooter from "../components/MyFooter";

export default {
  name: "Home",
  components: {
    MyNav,
    MyHeader,
    MyFooter
  }
};
</script>
<style lang="less" scoped>

</style>
