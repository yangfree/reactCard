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
        <el-table-column fixed="right" label="操作" width="300">
          <template slot-scope="scope">
            <el-button @click="delData(scope.row)" type="danger" size="mini">删除</el-button>
            <el-button @click="authority" type="primary" size="mini">权限</el-button>
            <!-- <el-select v-model="authority.value" placeholder="权限选择">
              <el-option
                v-for="item in authority.authorityOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>-->
          </template>
        </el-table-column>
      </el-table>
    </el-container>
  </div>
</template>          </template>
        </el-table-column>
      </el-table>
    </el-container>
  </div>
</template>
<script>
import { getUsersList, deleteUser } from "@/api/api.js";

export default {
  name: "AdminUser",
  data() {
    return {
      tableData: []
      // TODO: 权限相关
      // authority: {
      //   value: "",
      //   authorityOptions: [
      //     /**
      //      * 暂时分为五种用户
      //      *  root: 最高权限,拥有全部的权限,前台页面的访问和后台的增删改查
      //      *  admin: 管理员权限,目前只针对后台的管理
      //      *  vip: 付费文章观看权限
      //      *  user: 注册用户权限,可以看开方文章
      //      *  tourist: 游客权限,只能看首页和联系页面
      //      *
      //      */
      //     {
      //       value: "1",
      //       label: "root"
      //     },
      //     {
      //       value: "2",
      //       label: "admin"
      //     },
      //     {
      //       value: "3",
      //       label: "vip"
      //     },
      //     {
      //       value: "4",
      //       label: "user"
      //     },
      //     {
      //       value: "5",
      //       label: "tourist"
      //     }
      //   ]
      // }
    };
  },
  created() {
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
      // console.log(rows);
      this.$confirm("确认删除?")
        .then(() => {
          const id = rows._id;
          const username = rows.name;
          deleteUser("", { data: { id: id } })
            .then(res => {
              this.$message({
                type: "success",
                message: `删除${username}用户成功`,
                duration: 1500
              });
              this.getUsersData();
            })
            .catch(err => {
              this.$message({
                type: "err",
                message: err,
                duration: 1500
              });
            });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: err,
            duration: 1500
          });
        });
    },
    authority() {
      this.$notify({
        title: "温馨提示:",
        message: "权限信息后面会更新",
        position: "top-right",
        type: "warning"
      });
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
