<template>
    <el-col :span="24" class="header">
      <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        <!-- <a href="/home" style=" text-decoration:none;color:white">
          <i class="fa fa-envira" style="color:green" v-show="collapsed"></i>
          <span v-show="!collapsed">中医妇科临床流调数据中心</span>
        </a> -->
        <el-link href="/home" :underline="false">
          <i class="fa fa-envira fa-lg" style="color:green" v-show="collapsed"></i>
          <span v-show="!collapsed" style="color:white;font-size:17px">中医妇科临床流调数据中心</span>
        </el-link>
      </el-col>
      <el-col :span="2" :md="1" :sm="2" :xs="3">
        <div class="tools" @click.prevent="collapse">
          <i class="fa fa-align-justify"></i>
        </div>
      </el-col>
      <el-col :span="12">
        {{title}}
      </el-col>
      <el-col :span="6" class="userinfo">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link userinfo-inner">
            <img src="@/assets/Nurse.png" />
            {{userinfo.user_name}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="dialogVisible=true" icon="el-icon-user"  style="width:80px">账户信息</el-dropdown-item>
            <el-dropdown-item  @click.native="changePassword" icon="fa fa-cog">修改密码</el-dropdown-item>
            <!-- 这里的native不能删,native用来触发原生的事件,可以理解为把一个vue组件转化为一个普通的HTML标签 -->
            <el-dropdown-item divided @click.native="logout" icon="fa fa-power-off">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <!-- <UserInfo ref="userInfo"></UserInfo> -->
      <el-dialog
        title="账户信息"
        :visible.sync="dialogVisible" class="my-dialog"
        :close-on-click-modal="false" width="60%" center>
        <p><span class="account-style">用户名:</span>{{userinfo.user_name}}</p>
        <p><span class="account-style">性别:</span>{{userinfo.sex}}</p>
        <p><span class="account-style">所属医院:</span>{{userinfo.hospital}}</p>
        <p><span class="account-style">地址:</span>{{userinfo.address}}</p>
        <p><span class="account-style">邮箱:</span>{{userinfo.email}}</p>
        <p><span class="account-style">电话:</span>{{userinfo.phone}}</p>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-col>
</template>

<script>
export default {
    name:"Header",
    data () {
      return {
        collapsed: true,
        userinfo:{},
        prjIcon:'<i class="fa fa-envira" style="color:green"></i>',
        dialogVisible:false
      }
    },
    props: ['title'],
    methods:{
      // 修改密码
      changePassword () {
        this.$router.push({ path: '/password' })
      },
      // 登出
      logout: function () {
        var _this = this; //这条语句是防止this指向当前函数,这样赋值_this就指向vm对象了
        this.$confirm("确认退出吗?", "提示", {type: "warning"})
          .then(() => {
            sessionStorage.removeItem("userinfo");
            _this.$router.push("/login");
          })
          .catch(() => {});
      },
      // 折叠导航栏
      collapse: function () {
        this.collapsed = !this.collapsed
        this.$emit("headerEvent", this.collapsed)
      },
    },
    created () {
        this.userinfo = JSON.parse((sessionStorage.getItem("userinfo")))
    }
}
</script>
<style lang="scss" scoped>
@import "../../assets/styles/vars";

  .header {
    height: 60px;
    line-height: 60px;
    background: $color-primary;
    color: #fff;

    .userinfo {
      text-align: right;
      padding-right: 5px;
      float: right;

      .userinfo-inner {
        cursor: pointer;
        color: #fff;

        img {
          width: 40px;
          height: 40px;
          border-radius: 20px;
          margin: 10px 0px 10px 10px;
          float: right;
        }
      }
    }

    .logo {
      height: 60px;
      font-size: 17px;
      padding-left: 20px;
      padding-right: 20px;
      border-color: rgba(238, 241, 146, 0.3);
      border-right-width: 1px;
      border-right-style: solid;

      img {
        width: 40px;
        float: left;
        margin: 10px 10px 10px 18px;
      }

      .txt {
        color: #fff;
      }
    }

    .logo-width {
      width: $aside-width;
    }

    .logo-collapse-width {
      width: 60px;
    }

    .tools {
      padding: 0px 23px;
      width: 14px;
      height: 60px;
      line-height: 60px;
      cursor: pointer;
    }
  }
    .account-style {
    color:blue;
    font-weight:600
  }
  .el-popper[x-placement^=bottom]{
    margin-top: 0px;
  }
</style>

