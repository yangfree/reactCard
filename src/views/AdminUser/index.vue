<template>
  <div class="admin-user">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>杨洁个人网站管理系统</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-container class="user-table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="昵称" width="120"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="200"></el-table-column>
        <el-table-column prop="createTime" label="日期" width="180"></el-table-column>
        <el-table-column prop="web" label="网站"></el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
          <template slot-scope="scope">
            <el-button @click="delData(scope.row)" type="danger" size="mini">删除</el-button>
            <el-button @click="updateData(scope.row)" type="primary" size="mini">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-container>
  </div>
</template>
<script>
import { getUsersList } from "@/api/api.js";

export default {
  name: "AdminUser",
  data() {
    return {
      tableData: [],
    };
  },
  created(){
    // 初始化数据
    this.getUsersData();
  },
  methods: {
    getUsersData() {
      getUsersList()
        .then(res => {
          // console.log(res);
          this.tableData = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    delData(rows) {
      console.log(rows);
    },
    updateData(row) {
      console.log(row);
    }
  }
};
</script>
<style lang="less" scoped>
.admin-user {
  .user-table {
    margin: 35px 25px;
  }
}
</style>
