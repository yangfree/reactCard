<template>
  <div class="my-nav">
    <!-- <div class="nav-radio">
      <i class="el-icon-menu"></i>
      <i class="el-icon-arrow-left"></i>
    </div> -->
    <el-menu
      :default-active="this.$route.path"
      class="el-menu-vertical-demo"
      router
      model="horizontal"
      active-text-color="#ffd04b"
    >
      <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
        <template slot="title">
          <i :class="item.iconPath"></i>
          <span>{{ item.navItem }}</span>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "myNav",
  data() {
    return {
      navList: [
        { name: "/web", navItem: "网站管理", iconPath: "el-icon-setting" },
        { name: "/article", navItem: "文章管理", iconPath: "el-icon-document" },
        { name: "/user", navItem: "用户管理", iconPath: "el-icon-user" }
      ]
    };
  },
  methods: {}
};
</script>

<style lang='less' scoped>
.my-nav {
  max-width: 15%;
  margin-top: 75px;
  // .nav-radio {
  //   text-align: right;
  // }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 100%;
    min-height: 100%;
  }
}
</style>