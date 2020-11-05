<template>
  <div class="personel-info">
    <div class="personel-header">
      <van-icon name="arrow-left" size="32" @click="backPersonel" />
    </div>
    <div class="peronel-content">
      <div v-if="isShow.personInfo" class="person-info">
        <van-form @submit="onSubmitPersonInfo">
          <van-field
            v-model="personInfo.username"
            name="用户名"
            label="用户名"
            placeholder="请填写您的用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="personInfo.phone"
            type="tel"
            name="手机号"
            label="手机号"
            placeholder="请填写您的手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
          />
          <div style="margin: 16px;">
            <van-button block type="info" native-type="submit">提交</van-button>
          </div>
        </van-form>
      </div>
      <div v-if="isShow.doctorInfo" class="doctor-info">
        <van-form @submit="onSubmitDoctorInfo">
          <!-- <van-field
            v-model="doctorInfo.username"
            name="用户名"
            label="用户名"
            placeholder="请填写您的用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="doctorInfo.phone"
            type="tel"
            name="手机号"
            label="手机号"
            placeholder="请填写您的手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
          /> -->
          <van-field
            v-model="doctorInfo.address"
            name="地址"
            label="地址"
            placeholder="请填写您的地址"
          />
          <van-field
            v-model="doctorInfo.hospital"
            name="医院名称"
            label="医院名称"
            placeholder="请填写您的医院名称"
          />
          <div style="margin: 16px;">
            <van-button block type="info" native-type="submit">提交</van-button>
          </div>
        </van-form>
      </div>
      <div v-if="isShow.assInfo" class="ass-info">
        <van-form @submit="onSubmitAssInfo">
          <van-field
            v-model="assInfo.username"
            name="用户名"
            label="用户名"
            placeholder="请填写您的用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="assInfo.phone"
            type="tel"
            name="手机号"
            label="手机号"
            placeholder="请填写您的手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
          />
          <div style="margin: 16px;">
            <van-button block type="info" native-type="submit">提交</van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
import ajax from "@/api/ajaxRequest.js";

export default {
  name: "PersonelInfo",
  components: {},
  data() {
    return {
      role: "",
      openid: "",
      isShow: {
        personInfo: false,
        doctorInfo: false,
        assInfo: false
      },
      personInfo: {
        username: "",
        phone: ""
      },
      doctorInfo: {
        // username: "",
        // phone: "",
        address: "",
        hospital: ""
      },
      assInfo: {
        username: "",
        phone: ""
      }
    };
  },
  created() {
    this.role = JSON.parse(localStorage.getItem("user")).role;
    this.openid = JSON.parse(localStorage.getItem("user")).openid;

    this.switchRolePage(this.role);
    // console.log(this.role, this.openid);
  },
  methods: {
    //提交患者信息
    onSubmitPersonInfo() {
      ajax
        .request({
          url: "/openid/",
          method: "PUT",
          data: {
            open_id: this.openid,
            username: this.personInfo.username,
            phone: this.personInfo.phone
          }
        })
        .then(() => {
          //   console.log(res);
          this.$dialog
            .alert({
              message: "提交成功"
            })
            .then(() => {
              this.$router.push({
                name: "Personel"
              });
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    //提交医生信息
    onSubmitDoctorInfo() {
      ajax
        .request({
          url: "/openid/",
          method: "PUT",
          data: {
            open_id: this.openid,
            username: this.doctorInfo.username,
            phone: this.doctorInfo.phone,
            address: this.doctorInfo.address,
            hospital: this.doctorInfo.hospital
          }
        })
        .then(() => {
          this.$dialog
            .alert({
              message: "提交成功"
            })
            .then(() => {
              this.$router.push({
                name: "Personel"
              });
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 提交医助信息
    onSubmitAssInfo() {
      ajax
        .request({
          url: "/openid/",
          method: "PUT",
          data: {
            open_id: this.openid,
            username: this.assInfo.username,
            phone: this.assInfo.phone
          }
        })
        .then(() => {
          this.$dialog
            .alert({
              message: "提交成功"
            })
            .then(() => {
              this.$router.push({
                name: "Personel"
              });
            });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 角色不同展示不同的填写项目
    switchRolePage(val) {
      switch (val) {
        case "patient":
          this.isShow.personInfo = true;
          break;
        case "doctor":
          this.isShow.doctorInfo = true;
          break;
        case "assistant":
          this.isShow.assInfo = true;
          break;
      }
    },
    // 跳转回个人中心页面
    backPersonel() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less" scoped>
.personel-info {
  .personel-header {
    padding: 16px;
  }
  .peronel-content {
    position: fixed;
    left: 0;
    top: 64px;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 25%;
  }
}
</style>
