<template>
  <div class="user-list">
    <div class="order-info" @click="viewOrder">
      <van-icon name="home-o" size="0.2rem" />
      <span>查看订单信息</span>
    </div>
    <div class="user-list">
      <van-cell
        title="个人信息"
        is-link
        value="完善个人信息"
        @click="improvePersonalInformation"
      />

      <van-cell title="地址管理" is-link value="地址管理" @click="goAddress" />
      <van-cell title="客服中心" is-link @click="goCustomer" />
      <van-cell title="使用须知" is-link @click="goFiles" />
    </div>
    <van-button type="info" block @click="changeRole">角色切换</van-button>
    <van-dialog
      v-model="showRole"
      :title="role | selectRole"
      show-cancel-button
      @confirm="confirmRole"
    >
      <van-radio-group v-model="radioRole">
        <van-cell-group>
          <van-cell
            v-for="item in roleList"
            :key="item"
            :title="item | selectRole"
            clickable
            @click="clcikRole(item)"
          >
            <template #right-icon>
              <van-radio :name="item" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
import ajax from "@/api/ajaxRequest.js";

export default {
  name: "UserList",
  data() {
    return {
      openid: "",
      role: "",
      showRole: false,
      radioRole: "",
      roleList: []
    };
  },
  created() {
    this.openid = JSON.parse(localStorage.getItem("user")).openid;
    this.role = JSON.parse(localStorage.getItem("user")).role;
    this.radioRole = JSON.parse(localStorage.getItem("user")).role;

    this.getRole();
  },
  methods: {
    goAddress() {
      this.$dialog({ message: "暂不开放" });
      return false;
      this.$router.push({
        name: "Address"
      });
    },
    goFiles() {
      this.$router.push({
        name: "UseInfomation"
      });
    },
    goCustomer() {
      this.$router.push({
        name: "Customer"
      });
    },
    improvePersonalInformation() {
      if (this.role === "expert") {
        this.$dialog({
          message: "专家不支持修改个人信息"
        });
        return false;
      }
      this.$router.push({
        name: "PersonelInfo"
      });
    },
    // 获取用户所有角色
    getRole() {
      ajax
        .request({
          url: "/role/",
          method: "GET",
          params: {
            open_id: this.openid
          }
        })
        .then(res => {
          // console.log(res);
          this.roleList = res;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 选择角色弹框
    changeRole() {
      // console.log(this.openid, this.role);
      this.showRole = true;
    },
    // 切换角色
    confirmRole() {
      ajax
        .request({
          url: "/role/",
          method: "PUT",
          data: {
            open_id: this.openid,
            role: this.radioRole
          }
        })
        .then(res => {
          console.log(res);
          this.$notify({
            type: "success",
            message: "修改成功,正在加载最新信息~~~"
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    clcikRole(item) {
      this.radioRole = item;
    },
    // 查看订单
    viewOrder() {
      /**
       * http://127.0.0.1:8080/doctor.html#/    doctor
       * http://127.0.0.1:8080/experts.html#/   expert
       * http://127.0.0.1:8080/patients.html    patient
       * http://127.0.0.1:8080/medical.html#/   assistant
       *
       */
      switch (this.role) {
        case "doctor":
          window.location.href = "https://hdmp.hdzyhosp.com/wechat/doctor.html";
          break;
        case "expert":
          window.location.href =
            "https://hdmp.hdzyhosp.com/wechat/experts.html#/todolist";
          // "https://hdmp.hdzyhosp.com/wechat/experts.html";
          break;
        case "patient":
          window.location.href =
            "https://hdmp.hdzyhosp.com/wechat/patients.html";
          break;
        case "assistant":
          window.location.href =
            "https://hdmp.hdzyhosp.com/wechat/medical.html";
          break;
      }
    }
  },
  filters: {
    selectRole(val) {
      switch (val) {
        case "expert":
          return "专家";
          break;
        case "doctor":
          return "医生";
          break;
        case "assistant":
          return "医助";
          break;
        default:
          return "患者";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.user-list {
  .order-info {
    width: 100%;
    height: 0.8rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    i {
      margin-bottom: 5px;
    }
  }

  .user-list {
    margin-bottom: 0.15rem;
  }
}
</style>
